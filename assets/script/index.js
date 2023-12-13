'use strict';

const button = document.querySelector('.login');
const dialog = document.querySelector('dialog');
const close = document.querySelector('span');

button.addEventListener('click', () => {
    dialog.showModal();
});

close.addEventListener('click', () => {
    dialog.close();
})


dialog.addEventListener('click',(e)=>{
    //console.log(e.target);
    const rect = e.target.getBoundingClientRect();
    
    if(e.clientY < rect.top || e.clientY>rect.bottom || e.clientX < rect.left || e.clientX>rect.right){
        dialog.close();
    }
})