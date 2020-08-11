var budgetController=(function(){

})();




var UIController=(function(){

})();




var appController=(function(budgetCtrl,UICtrl){

    let addBtn=document.getElementsByClassName('add__btn')[0];

    let ctrlAddItem=function(){
        /*
            1. get the input value
            2. add the item to the budget ctrlr
            3. add the item to UI
            4. calculate budget
            5. Display the budget on the UI
        */
    }

    addBtn.addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(e){
        if(e.keyCode===13 || e.which===13){
            ctrlAddItem();
        }
    });

})(budgetController,UIController);