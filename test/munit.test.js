const {merge}

it("should multiply two numbers", function(){
     
    var expectedResult = 15;
    var result = operations.multiply(3, 5);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});
it("should add two numbers", function(){
     
    var expectedResult = 16;
    var result = operations.add(9, 7);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});