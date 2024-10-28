

  // help.html action faq-item Lấy tất cả các phần tử câu hỏi
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          // Toggle hiển thị câu trả lời tương ứng khi nhấn vào câu hỏi
          const answer = question.nextElementSibling;
          answer.classList.toggle('show');
      });
  });

function toggleMenu() {
  var sidebar = document.querySelector(".sidebar");
  var dashboard = document.querySelector(".dashboard");

  // Thay đổi class để hiện hoặc ẩn menu
  sidebar.classList.toggle("visible");

  // Cập nhật margin-left của nội dung khi menu được mở
  if (sidebar.classList.contains("visible")) {
      dashboard.style.marginLeft = "250px"; // Đẩy nội dung sang phải
  } else {
      dashboard.style.marginLeft = "0"; // Đưa nội dung về vị trí ban đầu
  }
}
//code
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Đóng tất cả các dropdown khác
        dropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });

        // Đổi trạng thái active cho dropdown hiện tại
        dropdown.classList.toggle('active');
    });
});


