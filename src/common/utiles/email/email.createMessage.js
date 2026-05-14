export const createHtmlEmail = (otp)=>{
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Email</title>

  <style>
    body{
      margin:0;
      padding:0;
      background:#f4f4f4;
      font-family: Arial, sans-serif;
    }

    .container{
      width:100%;
      padding:40px 0;
    }

    .card{
      max-width:500px;
      background:#ffffff;
      margin:auto;
      border-radius:16px;
      padding:40px 30px;
      text-align:center;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    }

    .logo{
      font-size:28px;
      font-weight:bold;
      color:#2563eb;
      margin-bottom:20px;
    }

    h1{
      color:#111827;
      margin-bottom:10px;
      font-size:26px;
    }

    p{
      color:#6b7280;
      font-size:16px;
      line-height:1.8;
    }

    .otp{
      display:inline-block;
      margin:30px 0;
      padding:18px 35px;
      background:#2563eb;
      color:#fff;
      font-size:32px;
      font-weight:bold;
      letter-spacing:8px;
      border-radius:12px;
    }

    .footer{
      margin-top:25px;
      font-size:13px;
      color:#9ca3af;
    }

    @media(max-width:600px){
      .card{
        margin:15px;
        padding:30px 20px;
      }

      .otp{
        font-size:24px;
        padding:15px 25px;
        letter-spacing:5px;
      }
    }
  </style>
</head>

<body>

  <div class="container">
    <div class="card">

      <div class="logo">
            saraha app
      </div>

      <h1>OTP</h1>

      <p>
        user this otp to signup or forget password
      </p>

      <div class="otp">
        ${otp}
      </div>

      <p>
        الكود صالح لمدة 5 دقائق فقط
      </p>

    </div>
  </div>

</body>
</html>`
}