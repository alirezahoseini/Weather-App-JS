class Dom {

    select(selector){
        const element = document.querySelector(selector);
        return element
    }

    removeClassTimeOut(elementId ,time, classValue){
        const selectedElement = this.select(elementId)
        setTimeout(() => {
            selectedElement.classList.remove(classValue)
        }, time);
    }

    addClassTimeOut(elementId ,time, classValue){
        const selectedElement = this.select(elementId)
        setTimeout(() => {
            selectedElement.classList.add(classValue)
        }, time);
    }
}


export default Dom