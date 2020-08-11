var budgetController=(function(){

    let Income= function(id,description,value){
        this.id=id,
        this.description=description,
        this.value=value
    };

    let Expense= function(id,description,value){
        this.id=id,
        this.description=description,
        this.value=value
    };

    let data={
        allItems:{
            exp:[],
            inc:[]
        },
        total:{
            exp:0,
            inc:0
        }
    };
    
})();




var UIController=(function(){

    var DOMstrings={
        inputBtn: 'add__btn',
        inputType: 'add__type',
        inputDescription: 'add__description',
        inputValue: 'add__value'
    };

    return{
        getInput: function(){
            return{
                type: document.getElementsByClassName(DOMstrings.inputType)[0].value,
                description: document.getElementsByClassName(DOMstrings.inputDescription)[0].value,
                value: document.getElementsByClassName(DOMstrings.inputValue)[0].value
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();




var appController=(function(budgetCtrl,UICtrl){

    let setupEventListener=function(){
        let DOM=UICtrl.getDOMstrings();
        let addBtn=document.getElementsByClassName(DOM.inputBtn)[0];

        addBtn.addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.which===13){
                ctrlAddItem();
            }
    });

    };
    let ctrlAddItem=function(){
        
        // 1. get the input value

        let input=UICtrl.getInput();
        // 2. add the item to the budget ctrlr
        // 3. add the item to UI
        // 4. calculate budget
        // 5. Display the budget on the UI
        console.log(input);
    };

    return{
        init: function(){
            setupEventListener();
        }
    };

})(budgetController,UIController);

appController.init();