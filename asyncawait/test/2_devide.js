function devide(numA, numB) {
    return new Promise((resolve, reject) => {
        if (numB === 0)
            reject(new Error("Unable to devide by 0."));
        else
            resolve(numA / numB);
    });
}

devide(8, 2)
    .then(result => console.log("성공:", result))
    .catch(error => console.log("실패:", error));
    
devide(8, 0)
    .then(result => console.log("성공:", result))
    .catch(error => console.log("실패:", error));