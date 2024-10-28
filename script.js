// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5HLVTXhDEhs7mDas8z7LpwQZEobB21N8",
  authDomain: "iot-nhakinh.firebaseapp.com",
  databaseURL: "https://iot-nhakinh-default-rtdb.firebaseio.com",
  projectId: "iot-nhakinh",
  storageBucket: "iot-nhakinh.appspot.com",
  messagingSenderId: "469191729023",
  appId: "1:469191729023:web:0da843426c4cd1d77f044a",
  measurementId: "G-X0Z8T2KEPM",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Initialize Firebase

// Hiện nhiệt độ ở trang index
var humi = document.getElementById("humi");
var dbRef = firebase.database().ref().child("thongso/doam");
dbRef.on("value", function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var latestValue = childSnapshot.val(); // Lấy giá trị mới nhất từ mục cuối
    humi.innerText = latestValue; // Hiển thị giá trị lên HTML
  });
});
// dbRef.on('value', snap => humi.innerText = snap.val());

// Hiện độ ẩm ở trang index
var temp = document.getElementById("temp"); // lấy từ html
var dbRefND = firebase.database().ref().child("thongso/nhietdo"); // lấy từ database
dbRefND.on("value", function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var latestValue = childSnapshot.val(); // Lấy giá trị mới nhất từ mục cuối
    temp.innerText = latestValue; // Hiển thị giá trị lên HTML
  });
});
// Hiện ánh sáng ở trang index
var light = document.getElementById("light"); // lấy từ html
var dbRefAS = firebase.database().ref().child("thongso/anhsang"); // lấy từ database
dbRefAS.on("value", function (snapshot) {
  var data = snapshot.val();
  if (data == 0) {
    light.innerHTML = "Tốt";
  } else {
    light.innerHTML = "Kém";
  }
});
// hiện thị biểu đồ độ ẩm
var dbRefDA = firebase.database().ref().child("thongso/doam");
dbRefDA.on("value", function (snapshot) { 
  var labels = [];
  var data = [];

  snapshot.forEach(function (childSnapshot) {
    var latestValue = childSnapshot.val(); // Lấy giá trị mới nhất từ mục cuối
    data.push(latestValue);

    // Chuyển đổi timestamp thành định dạng ngày
    var currentDate = new Date(); // Lấy thời gian thực từ máy tính
    var formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;

    labels.push(formattedDate); // Thêm thời gian hiện tại vào mảng nhãn

    // console.log('hello'+ data);

    // Cập nhật dữ liệu vào biểu đồ
    lineChart.data.labels = labels;
    lineChart.data.datasets[0].data = data;
    lineChart.update(); // Cập nhật biểu đồ
  });
  console.log(data);
});
// hiện thị biểu đồ nhiệt độ
var dbRefND = firebase.database().ref().child("thongso/nhietdo");
dbRefND.on("value", function (snapshot) {
  var labels = [];
  var data = [];

  snapshot.forEach(function (childSnapshot) {
    var latestValue = childSnapshot.val(); // Lấy giá trị mới nhất từ mục cuối
    data.push(latestValue);

    // Chuyển đổi timestamp thành định dạng ngày
    var currentDate = new Date(); // Lấy thời gian thực từ máy tính
    var formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;

    labels.push(formattedDate); // Thêm thời gian hiện tại vào mảng nhãn

    // console.log('hello'+ data);

    // Cập nhật dữ liệu vào biểu đồ
    lineChart2.data.labels = labels;
    lineChart2.data.datasets[0].data = data;
    lineChart2.update(); // Cập nhật biểu đồ
  });
});
// =====================

// =====================




// =====================

// Ánh sáng
var dbRefAnhSang = firebase.database().ref().child("dieukhien/anhsang");
// Lắng nghe thay đổi từ Firebase
dbRefAnhSang.on("value", function (snapshot) {
  var anhsang = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

  // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
  if (anhsang === 0) {
    document.getElementById("checkboxSwitch-01").checked = false;
  } else {
    document.getElementById("checkboxSwitch-01").checked = true;
  }
});

// phun sương
var dbRefPhunSuong = firebase.database().ref().child("dieukhien/phunsuong");
// Lắng nghe thay đổi từ Firebase
dbRefPhunSuong.on("value", function (snapshot) {
  var phunsuong = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

  // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
  if (phunsuong === 0) {
    document.getElementById("checkboxSwitch-02").checked = false;
  } else {
    document.getElementById("checkboxSwitch-02").checked = true;
  }
});

// quạt gió
var dbRefQuatGio = firebase.database().ref().child("dieukhien/quatgio");
dbRefQuatGio.on("value", function (snapshot) {
  var quatgio = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

  // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
  if (quatgio === 0) {
    document.getElementById("checkboxSwitch-03").checked = false;
  } else {
    document.getElementById("checkboxSwitch-03").checked = true;
  }
});

//
function pushDataAnhSang() {
  var isChecked = document.getElementById("checkboxSwitch-01").checked; // Lấy trạng thái của checkbox
  var dbRef = firebase.database().ref().child("dieukhien/anhsang"); // Tham chiếu đến vị trí cần lưu dữ liệu

  var valueToPush = isChecked ? 1 : 0; // Chuyển trạng thái checkbox thành 1 hoặc 0
  dbRef.set(valueToPush); // Đẩy giá trị 0 hoặc 1 lên Firebase
}
function pushDataPhunSuong() {
  var isChecked = document.getElementById("checkboxSwitch-02").checked; // Lấy trạng thái của checkbox
  var dbRef = firebase.database().ref().child("dieukhien/phunsuong"); // Tham chiếu đến vị trí cần lưu dữ liệu

  var valueToPush = isChecked ? 1 : 0; // Chuyển trạng thái checkbox thành 1 hoặc 0
  dbRef.set(valueToPush); // Đẩy giá trị 0 hoặc 1 lên Firebase
}
function pushDataQuatGio() {
  var isChecked = document.getElementById("checkboxSwitch-03").checked; // Lấy trạng thái của checkbox
  var dbRef = firebase.database().ref().child("dieukhien/quatgio"); // Tham chiếu đến vị trí cần lưu dữ liệu

  var valueToPush = isChecked ? 1 : 0; // Chuyển trạng thái checkbox thành 1 hoặc 0
  dbRef.set(valueToPush); // Đẩy giá trị 0 hoặc 1 lên Firebase
}

function chedoManual() {
  var dbRef = firebase.database().ref().child("trangthai/chedo");
  dbRef.set(0);
  
  var checkboxes = document.querySelectorAll(".switch .checkbox");
  checkboxes.forEach(function (checkbox) {
    checkbox.disabled = false; // Kích hoạt lại checkbox
    // Đặt lại màu nền cho slider
    const slider = checkbox.nextElementSibling;
    slider.style.backgroundColor = "#fff"; // Màu nền mặc định
  });
}
function chedoAuto() {
  var dbRef = firebase.database().ref().child("trangthai/chedo");
  dbRef.set(1);
  document.getElementById("auto").addEventListener("click", function () {
    var checkboxes = document.querySelectorAll(".switch .checkbox");
    checkboxes.forEach(function (checkbox) {
      checkbox.disabled = true; // Vô hiệu hóa checkbox
      const slider = checkbox.nextElementSibling;
      slider.style.backgroundColor = "#d3d3d3"; // Màu nền mặc định
    });
  });
}
// lấy giá trị từ firebase để hiện thị nút button chế độ bằng tay hoặc chế đọ tự động
var manual = document.getElementById("manual");
var auto = document.getElementById("auto");

// Tham chiếu đến đường dẫn 'trangthai/chedo' trong Firebase
var dbRefChedo = firebase.database().ref().child("trangthai/chedo");
console.log('hello');

// Lắng nghe thay đổi từ Firebase
dbRefChedo.on("value", function (snapshot) {
  var chedo = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase
  console.log('hello'+ chedo);
  
  // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
  if (chedo === 0) {
    manual.classList.add("selected");
    auto.classList.remove("selected");
  } else {
    manual.classList.remove("selected");
    auto.classList.add("selected");
    var checkboxes = document.querySelectorAll(".switch .checkbox");
    checkboxes.forEach(function (checkbox) {
      checkbox.disabled = true; // Vô hiệu hóa checkbox
      const slider = checkbox.nextElementSibling;
      slider.style.backgroundColor = "#d3d3d3"; // Màu nền mặc định
    });
    // Ánh sáng
    var dbRefAnhSang = firebase.database().ref().child("dieukhien/anhsang");
    // Lắng nghe thay đổi từ Firebase
    dbRefAnhSang.on("value", function (snapshot) {
      var anhsang = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

      // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
      if (anhsang === 0) {
        document.getElementById("checkboxSwitch-01").checked = false;
      } else {
        document.getElementById("checkboxSwitch-01").checked = true;
      }
    });

    // phun sương
    var dbRefPhunSuong = firebase.database().ref().child("dieukhien/phunsuong");
    // Lắng nghe thay đổi từ Firebase
    dbRefPhunSuong.on("value", function (snapshot) {
      var phunsuong = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

      // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
      if (phunsuong === 0) {
        document.getElementById("checkboxSwitch-02").checked = false;
      } else {
        document.getElementById("checkboxSwitch-02").checked = true;
      }
    });

    // quạt gió
    var dbRefQuatGio = firebase.database().ref().child("dieukhien/quatgio");
    dbRefQuatGio.on("value", function (snapshot) {
      var quatgio = snapshot.val(); // Lấy giá trị của 'chedo' từ Firebase

      // Kiểm tra nếu chế độ là 1 thì thêm class 'selected', ngược lại thì gỡ bỏ
      if (quatgio === 0) {
        document.getElementById("checkboxSwitch-03").checked = false;
      } else {
        document.getElementById("checkboxSwitch-03").checked = true;
      }
    });
  }
});
// data.html
// lấy giá trị từ firebase để hiện thị Device Control
var btnFilter = document.getElementById("btn-fillter").addEventListener("click", functionFilter);

function functionFilter() {
  var dbRefTS = firebase.database().ref().child("thongso");
  dbRefTS.on("value", function (snapshot) {
    // console.log(snapshot.val() );
    var data = snapshot.val();
    const minTemp = document.getElementById("minTemp").value;
    const maxHumidity = document.getElementById("maxHumidity").value;

    // tìm kiếm độ ẩm
    const filteredDoam = Object.values(data.doam).filter((doam) => {
      return maxHumidity === '' || doam <= parseFloat(maxHumidity);
    });
    const filteredNhietdo = Object.values(data.nhietdo).filter((nhietdo) => {
      return minTemp === '' || nhietdo >= parseFloat(minTemp);
    });
    updateTable(filteredDoam, filteredNhietdo);
  });

  // Cập nhật bảng với dữ liệu đã lọc
  updateTable(filteredDoam, filteredNhietdo);
}
function updateTable(filteredDoam, filteredNhietdo) {
  const tableBody = document.getElementById("dataTable").querySelector("tbody");
  tableBody.innerHTML = ''; // Xóa nội dung cũ
  var j = 1;
  // Giả sử bạn muốn hiển thị dữ liệu từ filteredDoam và filteredNhietdo cùng một lúc
  for (let i = 0; i < Math.max(filteredDoam.length, filteredNhietdo.length); i++) {
    const row = document.createElement("tr");
    const daCell = document.createElement("td");
    daCell.textContent = j;
    row.appendChild(daCell);

    // Thêm nhiệt độ vào cột 2
    const tempCell = document.createElement("td");
    tempCell.textContent = i < filteredNhietdo.length ? filteredNhietdo[i] : 'null'; // Nếu không có dữ liệu thì để trống
    row.appendChild(tempCell);


    // Thêm độ ẩm vào cột 1
    const humidityCell = document.createElement("td");
    humidityCell.textContent = i < filteredDoam.length ? filteredDoam[i] : 'null'; // Nếu không có dữ liệu thì để trống
    row.appendChild(humidityCell);


    const dddCell = document.createElement("td");
    dddCell.textContent = 'null';
    row.appendChild(dddCell);

    const phCell = document.createElement("td");
    phCell.textContent = 'null';
    row.appendChild(phCell);

    const niPhotphoCell = document.createElement("td");
    niPhotphoCell.textContent = 'null';
    row.appendChild(niPhotphoCell);

    const kCell = document.createElement("td");
    kCell.textContent = 'null';
    row.appendChild(kCell);

    const dayCell = document.createElement("td");
    const currentDate = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
    dayCell.textContent = currentDate;
    row.appendChild(dayCell);

    tableBody.appendChild(row);
    j++;
  }
}