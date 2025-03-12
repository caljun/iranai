function postItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value || "0円";
    const imageInput = document.getElementById('image');
    
    if (!title || !description) {
        alert('タイトルと説明を入力してください');
        return;
    }
    
    const itemList = document.getElementById('itemList');
    const item = document.createElement('div');
    item.style.border = "1px solid black";
    item.style.margin = "10px";
    item.style.padding = "10px";
    
    let imageUrl = "";
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            item.innerHTML = `<h3>${title}</h3><p>${description}</p><p>価格: ${price}</p><img src="${imageUrl}" style="max-width:100%; height:auto;"><br><button onclick="requestItem('${title}')">欲しい！</button>`;
            itemList.appendChild(item);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        item.innerHTML = `<h3>${title}</h3><p>${description}</p><p>価格: ${price}</p><button onclick="requestItem('${title}')">欲しい！</button>`;
        itemList.appendChild(item);
    }
}

function requestItem(title, sellerInstagram) {
    if (!sellerInstagram) {
        alert("出品者のインスタIDが登録されていません");
        return;
    }
    
    const dmLink = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(`「${title}」が欲しいです！\nお取引についてご連絡ください！`)}&recipient=${sellerInstagram}`;

    window.open(dmLink, '_blank'); // DM画面に飛ぶ & メッセージ入力済み
}
