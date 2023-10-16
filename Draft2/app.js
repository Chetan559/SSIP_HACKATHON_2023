class chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox'),
            sendButton: document.querySelector('#send-button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {chatBox, sendButton} = this.args;

        sendButton.addEventListener( 'click',  () => this.onSendButton(chatBox))

        const node = chatBox.querySelector( 'input');
        node.addEventListener( "keyup",  ({key: string }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }
    
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch( '/Backed_Draft_01/app.py/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Rule_Mitra", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Rule_Mitra")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

