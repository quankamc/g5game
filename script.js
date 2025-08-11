// Chuyển đổi Văn bản sang Giọng nói (Text-to-Speech)
const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-button');

speakButton.addEventListener('click', () => {
    const textToSpeak = textInput.value;
    if (textToSpeak.trim() === '') {
        alert('Vui lòng nhập văn bản để phát âm.');
        return;
    }
    
    // Tạo đối tượng SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Tùy chỉnh giọng nói và ngôn ngữ
    utterance.lang = 'vi-VN'; // Đặt ngôn ngữ là Tiếng Việt
    
    // Sử dụng window.speechSynthesis để phát âm
    window.speechSynthesis.speak(utterance);
});

// Chuyển đổi Giọng nói sang Văn bản (Speech-to-Text)
const microphoneButton = document.getElementById('microphone-button');
const microphoneStatus = document.getElementById('microphone-status');
const speechOutput = document.getElementById('speech-output');

// Kiểm tra xem trình duyệt có hỗ trợ SpeechRecognition không
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN'; // Đặt ngôn ngữ nhận dạng là Tiếng Việt
    recognition.interimResults = false; // Chỉ trả về kết quả cuối cùng
    recognition.continuous = false; // Dừng lại sau khi người dùng ngừng nói
    
    let isRecording = false;

    microphoneButton.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    recognition.onstart = () => {
        isRecording = true;
        microphoneButton.style.backgroundColor = '#dc3545'; // Màu đỏ khi đang ghi âm
        microphoneButton.innerHTML = '<i class="fas fa-stop"></i> Dừng lại';
        microphoneStatus.textContent = 'Đang lắng nghe...';
        speechOutput.textContent = 'Bạn hãy nói...';
    };

    recognition.onend = () => {
        isRecording = false;
        microphoneButton.style.backgroundColor = '#007bff'; // Trở lại màu ban đầu
        microphoneButton.innerHTML = '<i class="fas fa-microphone"></i> Bắt đầu nói';
        microphoneStatus.textContent = 'Đã dừng.';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        speechOutput.textContent = transcript;
    };

    recognition.onerror = (event) => {
        microphoneStatus.textContent = `Lỗi: ${event.error}`;
        console.error('Lỗi nhận dạng giọng nói:', event.error);
    };
} else {
    // Thông báo nếu trình duyệt không hỗ trợ API
    microphoneButton.style.display = 'none';
    microphoneStatus.textContent = 'Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.';
    console.error('Web Speech API (SpeechRecognition) không được hỗ trợ.');
}
