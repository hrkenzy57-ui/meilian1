<?php
// ===========================
// CẤU HÌNH DỮ LIỆU (dễ sửa)
// ===========================
$items = [
    [
        "title" => "Alipay",
        "image" => "/114.jpg",
        "note"  => "Ghi chú nội dung Alipay ở đây..."
    ],
    [
        "title" => "WeChat",
        "image" => "/115.jpg",
        "note"  => "Ghi chú nội dung WeChat ở đây..."
    ],
];
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới thiệu - Meilian.xyz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f7fb;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 1100px;
            margin: 40px auto;
            padding: 20px;
        }

        h1 {
            font-size: 42px;
            margin-bottom: 25px;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 22px;
        }

        .card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 8px 18px rgba(0,0,0,0.08);
            overflow: hidden;
            padding: 18px;
        }

        .card img {
            width: 100%;
            border-radius: 14px;
            margin-bottom: 14px;
            display: block;
        }

        .card h2 {
            font-size: 24px;
            margin: 10px 0;
            font-weight: 700;
        }

        textarea {
            width: 100%;
            height: 140px;
            padding: 12px;
            font-size: 15px;
            border-radius: 12px;
            border: 1px solid #ddd;
            outline: none;
            resize: vertical;
        }

        textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }

        .small-note {
            margin-top: 8px;
            font-size: 13px;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Giới thiệu</h1>

        <div class="cards">
            <?php foreach($items as $item): ?>
                <div class="card">
                    <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>">
                    <h2><?= htmlspecialchars($item['title']) ?></h2>

                    <textarea placeholder="Nhập ghi chú..."><?= htmlspecialchars($item['note']) ?></textarea>
                    <div class="small-note">* Bạn có thể sửa nội dung ghi chú dễ dàng</div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
