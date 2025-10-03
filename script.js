
        
        // Mobile sidebar toggle functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        function toggleSidebar() {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('hidden');
        }

        // Event listeners for sidebar
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar); // click outside to close

        // File upload and drag/drop functionality - this was tricky to get right
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const documentList = document.getElementById('documentList');

        // Click upload area to open file picker
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop event handlers
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // prevent default to allow drop
            uploadArea.classList.add('dragover'); // visual feedback
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover'); // remove visual feedback
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files); // process dropped files
        });

        // Handle file input change (when user selects files)
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                // Start with Processing status and simulate the workflow
                addDocumentToList(file.name, 'Processing', file);
            });
        }

        function getCategoryColor(category) {
            const colors = {
                'Invoice': 'bg-green-100 text-green-800',
                'Purchase Order': 'bg-blue-100 text-blue-800',
                'Inventory': 'bg-orange-100 text-orange-800',
                'Shipping': 'bg-purple-100 text-purple-800',
                'Contract': 'bg-indigo-100 text-indigo-800'
            };
            return colors[category] || 'bg-gray-100 text-gray-800';
        }

        function getPriorityColor(priority) {
            const colors = {
                'High Priority': 'bg-yellow-100 text-yellow-800',
                'Standard': 'bg-blue-100 text-blue-800',
                'Low Priority': 'bg-gray-100 text-gray-800'
            };
            return colors[priority] || 'bg-gray-100 text-gray-800';
        }

        function addDocumentToList(fileName, status, file = null) {
            const statusColors = {
                'Ready to process': 'bg-blue-100 text-blue-800',
                'Processing': 'bg-yellow-100 text-yellow-800',
                'Analyzed': 'bg-green-100 text-green-800',
                'Error': 'bg-red-100 text-red-800'
            };

            // Determine file type and color
            const fileExt = fileName.split('.').pop().toLowerCase();
            let fileColor = 'bg-gray-100';
            let iconColor = 'text-gray-600';
            
            if (fileExt === 'pdf') {
                fileColor = 'bg-red-100';
                iconColor = 'text-red-600';
            } else if (fileExt === 'doc' || fileExt === 'docx') {
                fileColor = 'bg-blue-100';
                iconColor = 'text-blue-600';
            } else if (fileExt === 'txt') {
                fileColor = 'bg-green-100';
                iconColor = 'text-green-600';
            }

            // Generate mock file size and page count
            const fileSize = file ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : (Math.random() * 3 + 0.5).toFixed(1) + ' MB';
            const pageCount = Math.floor(Math.random() * 20) + 1;

            // Generate random categorization tags
            const categories = ['Invoice', 'Purchase Order', 'Inventory', 'Shipping', 'Contract'];
            const priorities = ['Verified', 'Pending Review', 'Red Flag'];
            const types = ['Financial Doc', 'Procurement', 'Logistics', 'Vendor Agreement', 'Audit Trail'];
            
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const randomType = types[Math.floor(Math.random() * types.length)];
            const showPriority = Math.random() > 0.5;
            const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

            const docElement = document.createElement('div');
            docElement.className = 'bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover-lift cursor-pointer file-enter';
            docElement.innerHTML = `
                <div class="flex items-start space-x-3">
                    <!-- File Preview Thumbnail -->
                    <div class="w-12 h-16 ${fileColor} rounded border flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 ${iconColor}" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-medium text-gray-900 truncate">${fileName}</span>
                            <span class="text-xs ${statusColors[status]} px-2 py-1 rounded-full">${status}</span>
                        </div>
                        <p class="text-xs text-gray-500 mb-1">${fileSize} • ${pageCount} pages</p>
                        <div class="flex items-center space-x-1 mb-1">
                            <span class="text-xs ${getCategoryColor(randomCategory)} px-2 py-1 rounded-full">${randomCategory}</span>
                            ${showPriority ? `<span class="text-xs ${getPriorityColor(randomPriority)} px-2 py-1 rounded-full">${randomPriority}</span>` : ''}
                            <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">${randomType}</span>
                        </div>
                        <p class="text-xs text-gray-400">Just uploaded</p>
                        ${status === 'Processing' ? `
                        <div class="mt-2 mb-2">
                            <div class="flex items-center space-x-2 mb-2">
                                <svg class="w-3 h-3 text-yellow-500 processing-spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                <span class="text-xs text-gray-500">Analyzing document...</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1.5">
                                <div class="bg-yellow-500 h-1.5 rounded-full processing-bar" style="width: 0%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Processing... <span class="processing-percent">0%</span></p>
                        </div>
                        ` : ''}
                        <div class="mt-2 flex space-x-2">
                            <button class="text-xs text-blue-600 hover:text-blue-800 preview-btn">Preview</button>
                            ${status === 'Analyzed' ? '<button class="text-xs text-blue-600 hover:text-blue-800">View Analysis</button>' : ''}
                            <button class="text-xs text-red-600 hover:text-red-800 remove-btn">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            
            documentList.appendChild(docElement);

            // Add event listeners
            const removeBtn = docElement.querySelector('.remove-btn');
            const previewBtn = docElement.querySelector('.preview-btn');
            
            removeBtn.addEventListener('click', () => {
                docElement.remove();
            });

            previewBtn.addEventListener('click', () => {
                showPreviewModal(fileName);
            });

            // Simulate processing if status is Processing
            if (status === 'Processing') {
                simulateProcessing(docElement);
            }
        }

        function simulateProcessing(docElement) {
            const progressBar = docElement.querySelector('.processing-bar');
            const progressPercent = docElement.querySelector('.processing-percent');
            const statusBadge = docElement.querySelector('.text-xs.bg-yellow-100');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    progressBar.style.width = '100%';
                    progressPercent.textContent = '100%';
                    
                    setTimeout(() => {
                        statusBadge.className = 'text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full';
                        statusBadge.textContent = 'Ready to process';
                        docElement.querySelector('.mt-2.mb-2').remove();
                        
                        // Add success animation
                        docElement.classList.add('upload-success');
                        
                        // Show brief confirmation message
                        showUploadConfirmation(docElement.querySelector('.text-sm.font-medium').textContent);
                    }, 500);
                    
                    clearInterval(interval);
                } else {
                    progressBar.style.width = progress + '%';
                    progressPercent.textContent = Math.floor(progress) + '%';
                }
            }, 200);
        }

        function showUploadConfirmation(fileName) {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2';
            notification.innerHTML = `
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm font-medium">${fileName} ready to process!</span>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        function showPreviewModal(fileName) {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                    <div class="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Preview: ${fileName}</h3>
                        <button class="text-gray-400 hover:text-gray-600 close-modal">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="p-6 text-center">
                        <div class="w-32 h-40 bg-gray-100 rounded border mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <p class="text-gray-600 mb-4">Document preview would appear here</p>
                        <p class="text-sm text-gray-500">In a real application, this would show the first page of the document</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        }

        // Chat functionality
        const chatForm = document.getElementById('chatForm');
        const messageInput = document.getElementById('messageInput');
        const chatWindow = document.getElementById('chatWindow');
        const attachButton = document.getElementById('attachButton');

        // Auto-resize textarea
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Handle Enter key (Shift+Enter for new line)
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });

        attachButton.addEventListener('click', () => fileInput.click());

        // Clear chat functionality
        const clearChatBtn = document.getElementById('clearChatBtn');
        clearChatBtn.addEventListener('click', () => {
            const chatContainer = chatWindow.querySelector('.max-w-4xl');
            // Keep only the welcome message (first child)
            const welcomeMessage = chatContainer.firstElementChild;
            chatContainer.innerHTML = '';
            chatContainer.appendChild(welcomeMessage);
        });

        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            // Add user message to chat
            addMessageToChat(message, 'user');
            messageInput.value = '';
            messageInput.style.height = 'auto';

            // Show typing indicator
            showTypingIndicator();
            
            // Simulate AI response
            setTimeout(() => {
                hideTypingIndicator();
                const responses = [
                    "Invoice analysis complete. Found <span class='bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium'>3 duplicate invoices</span> totaling $47,230. Recommend immediate vendor review.",
                    "Red flag detected: Purchase order #PO-2024-1847 shows 340% price increase from previous orders for identical items. Requires investigation.",
                    "Inventory reconciliation: <span class='bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium'>98.7% accuracy</span>. Minor discrepancies in warehouse B (12 items, $2,340 value).",
                    "Shipping anomaly: 15 orders to same address with different company names. Potential shell company or fraud indicator.",
                    "Vendor analysis: <span class='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium'>Acme Corp</span> represents 67% of total spend. High concentration risk identified.",
                    "Document cross-reference complete. Found 8 purchase orders without matching invoices. Total exposure: $156,890.",
                    "Cost analysis: <span class='text-green-600 font-medium'>Savings opportunity</span> of $23,450 identified through vendor consolidation.",
                    "Compliance check: All shipping documents contain required certifications. No regulatory red flags detected."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessageToChat(randomResponse, 'ai');
            }, 1500);
        }

        function showTypingIndicator() {
            const chatContainer = chatWindow.querySelector('.max-w-4xl');
            const typingElement = document.createElement('div');
            typingElement.id = 'typingIndicator';
            typingElement.className = 'flex items-start space-x-3';
            typingElement.innerHTML = `
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                </div>
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-2xl">
                    <div class="flex items-center space-x-1">
                        <span class="text-gray-500">DataRoom AI is analyzing</span>
                        <div class="flex space-x-1">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                </div>
            `;
            chatContainer.appendChild(typingElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function addMessageToChat(message, sender) {
            const chatContainer = chatWindow.querySelector('.max-w-4xl');
            const messageElement = document.createElement('div');
            
            if (sender === 'user') {
                messageElement.className = 'flex items-start space-x-3 justify-end message-enter';
                messageElement.innerHTML = `
                    <div class="bg-blue-600 text-white rounded-lg p-4 max-w-2xl user-bubble">
                        <p>${message}</p>
                        <span class="text-xs text-blue-100 mt-2 block">Just now</span>
                    </div>
                    <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                `;
            } else {
                messageElement.className = 'flex items-start space-x-3 message-enter';
                messageElement.innerHTML = `
                    <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-2xl chat-bubble">
                        <p class="text-gray-900">${message}</p>
                        <span class="text-xs text-gray-500 mt-2 block">Just now</span>
                    </div>
                `;
            }
            
            chatContainer.appendChild(messageElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
  