export const resetPasswordSubject = "Reset Your Password";

export const resetPasswordHTML = `<html>
<head>
    <meta charset="UTF-8">
    <title>Awesome Email Template</title>
    <style>
        /* Add some styling here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 18px;
            line-height: 1.6;
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: white;
            text-align: center;
            padding: 10px 20px;
            border: none;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Awesome Email</h1>
        <p>
            Hello there!
            <br>
            This is an example of an awesome email template. You can customize this template to suit your needs. Feel free to add images, links, and more.
        </p>
        <p>
            <a href="https://ordain-interior.vercel.app/resetPassword" class="button">Visit Our Website</a>
        </p>
    </div>
</body>
</html>
`;
