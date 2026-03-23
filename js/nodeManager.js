import dataManager from './dataManager.js';

class NodeManager {
    constructor() {
        this.currentView = 'list';
    }

    async init() {
        await this.renderNodesList();
        this.setupEventListeners();
    }

    async renderNodesList() {
        const nodes = dataManager.getVpsNodes();
        const container = document.querySelector('.nodes-list');
        
        if (!container) return;

        container.innerHTML = '';

        if (nodes.length === 0) {
            container.innerHTML = '<p class="no-nodes">暂无节点</p>';
            return;
        }

        nodes.forEach(node => {
            const nodeItem = document.createElement('div');
            nodeItem.className = 'node-item';
            nodeItem.innerHTML = `
                <div class="node-header">
                    <h3>${node.name}</h3>
                    <span class="node-purity">${node.purity || '纯度: ' + (node.purity || '未知')}</span>
                </div>
                <div class="node-details">
                    ${node.link ? `
                        <p><strong>链接：</strong> <a href="${node.link}" target="_blank" class="node-link">${node.link}</a></p>
                    ` : ''}
                    <p><strong>状态：</strong> <span class="status-${node.status === 'online' ? 'online' : 'offline'}">● ${node.status === 'online' ? '在线' : '离线'}</span></p>
                </div>
            `;
            container.appendChild(nodeItem);
        });
    }

    renderSubscription() {
        const subscription = dataManager.getSubscription();
        const selfBuiltInput = document.querySelector('.subscription-link input:first-of-type');
        const highPurityInput = document.querySelector('.subscription-link input:nth-of-type(2)');
        
        if (selfBuiltInput) {
            selfBuiltInput.value = subscription.selfBuilt || '';
        }
        
        if (highPurityInput) {
            highPurityInput.value = subscription.highPurity || '';
        }
    }

    setupEventListeners() {
        const addNodeBtn = document.createElement('button');
        addNodeBtn.textContent = '+ 添加节点';
        addNodeBtn.className = 'add-node-btn';
        addNodeBtn.onclick = () => this.showAddNodeForm();
        
        const nodesPage = document.querySelector('.nodes-page');
        const header = nodesPage.querySelector('h1');
        if (header) {
            header.appendChild(addNodeBtn);
        }
    }

    showAddNodeForm() {
        const formHtml = `
            <div class="add-node-form">
                <h3>添加新节点</h3>
                <div class="form-group">
                    <label>节点名称：</label>
                    <input type="text" id="node-name" placeholder="例如：节点 1 - 香港">
                </div>
                <div class="form-group">
                    <label>节点类型：</label>
                    <select id="node-type">
                        <option value="VLESS">VLESS</option>
                        <option value="V2Ray">V2Ray</option>
                        <option value="Trojan">Trojan</option>
                        <option value="Shadowsocks">Shadowsocks</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>纯度标识：</label>
                    <select id="node-purity">
                        <option value="高纯度">高纯度</option>
                        <option value="普通">普通</option>
                        <option value="低纯度">低纯度</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>节点链接：</label>
                    <input type="text" id="node-link" placeholder="vless://...">
                </div>
                <div class="form-actions">
                    <button onclick="nodeManager.saveNode()">保存</button>
                    <button onclick="nodeManager.cancelAddNode()">取消</button>
                </div>
            </div>
        `;

        const nodesList = document.querySelector('.nodes-list');
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        formContainer.innerHTML = formHtml;
        nodesList.parentNode.insertBefore(formContainer, nodesList);
    }

    async saveNode() {
        const name = document.getElementById('node-name').value;
        const type = document.getElementById('node-type').value;
        const purity = document.getElementById('node-purity').value;
        const link = document.getElementById('node-link').value;

        if (!name || !link) {
            alert('请填写节点名称和链接');
            return;
        }

        const newNode = {
            name: name,
            type: type,
            purity: purity,
            link: link,
            status: 'online'
        };

        await dataManager.addNode(newNode);
        this.cancelAddNode();
        this.renderNodesList();
        alert('节点添加成功！');
    }

    cancelAddNode() {
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.remove();
        }
    }

    async deleteNode(nodeId) {
        if (confirm('确定要删除这个节点吗？')) {
            await dataManager.deleteNode(nodeId);
            this.renderNodesList();
            alert('节点删除成功！');
        }
    }

    async updateSubscription(type, url) {
        const subscription = dataManager.getSubscription();
        
        if (type === 'selfBuilt') {
            subscription.selfBuilt = url;
        } else if (type === 'highPurity') {
            subscription.highPurity = url;
        }

        await dataManager.updateSubscription(subscription);
        alert('订阅链接更新成功！');
    }
}

const nodeManager = new NodeManager();
window.nodeManager = nodeManager;
export default nodeManager;