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

    return{
        addItem: function(type,des,val){

            //creating ID
            if(data.allItems[type].length==0){
                ID=0;
            }else{
                ID=data['allItems'][type][data.allItems[type].length-1].id+1;
            }
            //creating new items based on inc or exp type
            if(type==='inc'){
                var newItems=new Income(ID,des,val);
            }else if(type==='exp'){
                var newItems=new Expense(ID,des,val);
            }

            //push the new item to the data structure
            data.allItems[type].push(newItems);

            //return newItems
            return newItems
        }
    }
    
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
        let newItems=budgetController.addItem(input.type,input.description,input.value);

        // 3. add the item to UI
        // 4. calculate budget
        // 5. Display the budget on the UI
    };

    return{
        init: function(){
            setupEventListener();
        }
    };

})(budgetController,UIController);

appController.init();