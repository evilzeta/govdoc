const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let currentSignatureDataUrl = null; // 用于存储当前签名图片数据，以便下载

function generateSignature() {
    const name = document.getElementById('nameInput').value.trim();
    const fontFamily = document.getElementById('fontSelect').value;
    const color = document.getElementById('colorPicker').value;

    if (!name) {
        alert('请输入中文姓名！');
        return;
    }

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置文字样式
    ctx.font = `bold 180px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 绘制文字
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    // 绘制装饰性印章或线条（可选）
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 190, 0, Math.PI * 2);
    ctx.stroke();

    // 将当前画布内容转换为图片数据，供下载使用
    currentSignatureDataUrl = canvas.toDataURL('image/png');
    document.getElementById('downloadBtn').disabled = false;
}

function downloadSignature() {
    if (!currentSignatureDataUrl) return;

    const a = document.createElement('a');
    const name = document.getElementById('nameInput').value.trim() || '我的签名';
    a.href = currentSignatureDataUrl;
    a.download = `${name}-艺术签名.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 页面加载后，画布初始化一个示例
window.onload = function() {
    document.getElementById('nameInput').value = '签名';
    generateSignature();
};