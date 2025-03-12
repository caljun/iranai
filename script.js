function getUser() {
    const params = new URLSearchParams(window.location.search);
    return params.get("user") || "default";
}

function postItem() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value || "0円";
    const imageInput = document.getElementById('image');
    const sellerInstagram = document.getElementById('instagram').value.trim(); // Instagram IDを取得

    if (!title || !description || !sellerInstagram) {
        alert('タイトル、説明、出品者のInstagram IDを入力してください');
        return;
    }

    let imageUrl = "";
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            saveItem({ title, description, price, imageUrl, sellerInstagram });
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveItem({ title, description, price, imageUrl, sellerInstagram });
    }
}

function saveItem(item) {
    const user = getUser();
    let items = JSON.parse(localStorage.getItem(`iranaiItems_${user}`)) || [];
    items.push(item);
    localStorage.setItem(`iranaiItems_${user}`, JSON.stringify(items));
    displayItems();
}

function displayItems() {
    const user = getUser();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = "";
    let items = JSON.parse(localStorage.getItem(`iranaiItems_${user}`)) || [];

    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.border = "1px solid black";
        itemDiv.style.margin = "10px";
        itemDiv.style.padding = "10px";

        let imageTag = item.imageUrl ? `<img src="${item.imageUrl}" style="max-width:100%; height:auto;"><br>` : "";
        
        itemDiv.innerHTML = `<h3>${item.title}</h3>
                             <p>${item.description}</p>
                             <p>価格: ${item.price}</p>
                             ${imageTag}
                             <p>出品者: <a href="https://www.instagram.com/${item.sellerInstagram}" target="_blank">@${item.sellerInstagram}</a></p>
                             <button onclick="requestItem('${item.title}', '${item.sellerInstagram}')">欲しい！</button>
                             <button onclick="deleteItem(${index})">削除</button>`;
        
        itemList.appendChild(itemDiv);
    });
}

function deleteItem(index) {
    const user = getUser();
    let items = JSON.parse(localStorage.getItem(`iranaiItems_${user}`)) || [];
    items.splice(index, 1);
    localStorage.setItem(`iranaiItems_${user}`, JSON.stringify(items));
    displayItems();
}

function requestItem(title, sellerInstagram) {
    if (!sellerInstagram) {
        alert("出品者のInstagram IDが登録されていません");
        return;
    }
    const dmLink = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(`「${title}」が欲しいです！\nお取引についてご連絡ください！`)}&recipient=${sellerInstagram}`;
    window.open(dmLink, '_blank');
}

// ページを開いた時にリストを表示する
window.onload = displayItems;
