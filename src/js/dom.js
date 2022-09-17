

class Dom {

    removeClassTimeOut(elementId ,time, classValue){
        const selectedElement = document.querySelector(elementId)
        setTimeout(() => {
            selectedElement.classList.remove(classValue)
        }, time);
    }
    removeClass(elementId , classValue){
        const selectedElement = document.querySelector(elementId)
        selectedElement.classList.remove(classValue)

    }

    addClassTimeOut(elementId ,time, classValue){
        const selectedElement = document.querySelector(elementId)
        setTimeout(() => {
            selectedElement.classList.add(classValue)
        }, time);
    }

    addClass(elementId , classValue){
        const selectedElement = document.querySelector(elementId)
        selectedElement.classList.add(classValue)
    }

    replaceClass(element, prevClass, newClass){
        const selectedElem = document.querySelector(element);
        selectedElem.classList.remove(prevClass)
        
        setTimeout(() => {selectedElem.classList.add(newClass)}, 10)
    }
    // Show APP Page
    showApp() {
        this.addClassTimeOut("#loading", 300, "hidde");
        this.removeClassTimeOut("#app", 100, "hidden");
    }
    // Show First page and select city
    showFirstPage() {
        this.addClassTimeOut("#loading", 300, "hidde");
        this.addClass("#select_first_city", "flex");
        this.removeClass("#select_first_city", "hidden");
    }
    // Show Message
    showMessage(message, icon, colorClass){
        
    }
}


export default Dom