// const express = require('express');
// const cors = require("cors");

// const ApiError = require("./app/api-error");

// const app = express();


// app.use(cors());
// app.use(express.json());


// const contactsRouter = require("./app/routes/contact.route");


// app.use("/api/contacts", contactsRouter);
//     // handle 404 response
// app.use((req, res, next) => {
//     // Code ở đây sẽ chạy khi không có route được định nghĩa nào
//     // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
//     return next(new ApiError(404, "Resource not found"));
// });
//     // define error-handling middleware last, after other app.use() and routes calls
// app.use((err, req, res, next) => {
//     // Middleware xử lý lỗi tập trung.
//     // Trong các đoạn code xử lý ở các route, gọi next(error)
//     // sẽ chuyển về middleware xử lý lỗi này
//     return res.status(err.statusCode || 500).json({
//         message: err.message || "Internal Server Error",
//     });
// });



// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to contact book application." });
// });

// app.use("/api/contacts" , contactsRouter);

// module.exports = app;
const express = require('express');
const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

// Import the NhaXuatBan router
const nhaxuatbanRouter = require("./app/routes/nhaxuatban.route");

// Use the NhaXuatBan router
app.use("/api/nhaxuatban", nhaxuatbanRouter);

// Import the Sach router
const sachRouter = require("./app/routes/sach.route");

// Use the Sach router
app.use("/api/sach", sachRouter);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to publisher book application." });
});

module.exports = app;

