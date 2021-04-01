    // counter
    function counter(tag, number, def) {
        const tagContent = document.querySelector(tag);
        let content;
        let x = 0;
        let num = number;
        let lenth = num.toString().length;
        let firstThree = num.toString()[0] + num.toString()[1] + num.toString()[2];
        let multipl = ~~(4000 / firstThree);

        if (def === true) {
            function showNumDefault() {
                if (num.toString().length > 3) {
                    let arr = num.toString().split('');
                    arr.splice(num.toString().length - 3, 0, ',')
                    if (arr.length > 7) {
                        arr.splice(arr.length - 7, 0, ',')
                    }
                    content = arr.join('')
                }
                tagContent.textContent = content;
            }
            showNumDefault();
        } else {
            function showNum() {
                content = '' + x;
                for (let i = 0; i < lenth - 3; i++) {
                    content += Math.floor(Math.random() * 9);
                }
                if (x == firstThree) {
                    content = '' + num;
                }
                if (content.length > 3) {
                    let arr = content.split('');
                    arr.splice(content.length - 3, 0, ',')
                    if (arr.length > 7) {
                        arr.splice(arr.length - 7, 0, ',')
                    }
                    content = arr.join('')
                }
                tagContent.textContent = content;
                x++;
                if (x > firstThree) {
                    clearInterval(showNumber);
                }
            }
            let showNumber = setInterval(showNum, multipl);
        }
    }

    export default counter;
