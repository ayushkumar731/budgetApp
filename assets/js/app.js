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

    let calculateTotal= function(type){
        var sum=0;
        data.allItems[type].forEach((element)=>{
            sum+=element.value;
        });
        data.total[type]=sum;
    }

    let data={
        allItems:{
            exp:[],
            inc:[]
        },
        total:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage:-1
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
        },
        calculateBudget: function(){
           //calculate total income or expense
           calculateTotal('exp');
           calculateTotal('inc');

           //calculate the budget
           data.budget=data.total.inc-data.total.exp;

           //calculate percentage of income that we spent
           if(data.total.inc>0){
                data.percentage=Math.round((data.total.exp/data.total.inc)*100);
           }else{
               data.percentage=-1;
           }
        },
        getBudget: function(){

            return{
                budget: data.budget,
                percentage: data.percentage,
                totalIncome: data.total.inc,
                totalExpenses: data.total.exp
            }
        },
        test: function(){
            console.log(data);
        }
    }
    
})();




var UIController=(function(){

    var DOMstrings={
        inputBtn: 'add__btn',
        inputType: 'add__type',
        inputDescription: 'add__description',
        inputValue: 'add__value',
        incomeContainer: 'income__list',
        expenseContainer: 'expenses__list',
        inputValueQuery: '.add__value',
        inputDescriptionQuery: '.add__description',
        inputAvailableBudget: 'budget__value',
        inputTotalIncome: 'budget__income--value',
        inputTotalExpenses: 'budget__expenses--value',
        inputPercentage: 'budget__expenses--percentage'

    };

    return{
        getInput: function(){
            return{
                type: document.getElementsByClassName(DOMstrings.inputType)[0].value,
                description: document.getElementsByClassName(DOMstrings.inputDescription)[0].value,
                value: parseFloat(document.getElementsByClassName(DOMstrings.inputValue)[0].value)
            };
        },
        addListItem: function(obj,type){
            let html,newHtml,element;

            //create HTML string with placeholder text
            if(type==='inc'){
                element=DOMstrings.incomeContainer;
                html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type==='exp'){
                element=DOMstrings.expenseContainer;
                html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //replace the placeholder text from actual data

            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%description%',obj.description);
            newHtml=newHtml.replace('%value%',obj.value);

            //insert the HTML into the DOM

            document.getElementsByClassName(element)[0].insertAdjacentHTML('beforeend',newHtml);

        },
        clearField: function(){
            let field,fieldArr;

            //access the input field
            field=document.querySelectorAll(DOMstrings.inputValueQuery + ','+ DOMstrings.inputDescriptionQuery);

            //convert into the array
            fieldArr=Array.prototype.slice.call(field);

            //itetating in the array
            fieldArr.forEach((element,index,array) => {
                //clear the field value
                element.value = "";
            });

            //focus the input field description
            fieldArr[0].focus();
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();




var appController=(function(budgetCtrl,UICtrl){

    var setupEventListener=function(){
        var DOM=UICtrl.getDOMstrings();
        var addBtn=document.getElementsByClassName(DOM.inputBtn)[0];

        addBtn.addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.which===13){
                ctrlAddItem();
            }
    });

    }

    let updateBudge=function(){

        // 1. calculate budget
        budgetController.calculateBudget();

        // 2. return the budget
        let budget=budgetController.getBudget();

        // 3. Display the budget on the UI
        console.log(budget);


    }

    let ctrlAddItem=function(){
        
        let input,newItems
        // 1. get the input value
        input=UICtrl.getInput();

        if(input.description!="" && !isNaN(input.value) && input.value>0){

            // 2. add the item to the budget ctrlr
            newItems=budgetCtrl.addItem(input.type,input.description,input.value);

            // 3. add the item to UI
            UICtrl.addListItem(newItems,input.type);

            // 4. clear input field
            UICtrl.clearField();

            // 5. update budget 

            updateBudge();
        }
    }

    return{
        init: function(){
            setupEventListener();
        }
    };

})(budgetController,UIController);

appController.init();