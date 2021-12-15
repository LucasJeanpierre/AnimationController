const AnimationController = {
    animationInterval: Array(),
    animationTimeOut: Array(Array()),

    startAnimation: function(elementId) {
        element = document.getElementById(elementId);
        if (element != null) {
            animationClass = element.getAttribute('animationClass');
            if (animationClass != null) {
                element.classList.add(animationClass)
                if (element.style.animationPlayState == 'paused') element.style.animationPlayState = 'running';
            } else {
                console.warn('AnimationController : The element do not have animationClass attribute');
            }
        } else {
            console.warn('AnimationController : No element found');
        }
    },

    stopAnimation: function(elementId) {
        element = document.getElementById(elementId);
        if (element != null) {
            animationClass = element.getAttribute('animationClass');
            console.log(element);
            if (animationClass != null) {
                if (element.style.animationPlayState == 'running') element.style.animationPlayState = 'paused';
                element.classList.remove(animationClass)
            } else {
                console.warn('AnimationController : The element do not have animationClass attribute');
            }
        } else {
            console.warn('AnimationController : No element found');
        }
    },

    pauseAnimation: function(elementId) {
        element = document.getElementById(elementId);
        if (element != null) {
            animationClass = element.getAttribute('animationClass');
            if (animationClass != null) {
                element.style.animationPlayState = 'paused';
            } else {
                console.warn('AnimationController : The element do not have animationClass attribute');
            }
        } else {
            console.warn('AnimationController : No element found');
        }
    },

    startElementOfGlobalAnimation: function(element) {
        animationClass = element.getAttribute('animationClass');
        if (animationClass != null) {
            if (element.style.animationPlayState == 'paused') element.style.animationPlayState = 'running';
            if (!element.classList.contains(animationClass)) {
                element.classList.add(animationClass)
                setTimeout(() => {
                    element.classList.remove(animationClass)
                }, parseFloat(getComputedStyle(element).animationDuration) * 1000);
            }
        } else {
            console.warn('AnimationController : The element do not have animationClass attribute');
        }
    },

    stopElementOfGlobalAnimation: function(element) {
        animationClass = element.getAttribute('animationClass');
        if (animationClass != null) {
            if (element.style.animationPlayState == 'running') element.style.animationPlayState = 'paused';
            if (element.classList.contains(animationClass)) {
                element.classList.remove(animationClass)
            }
        } else {
            console.warn('AnimationController : The element do not have animationClass attribute');
        }
    },

    startGlobalAnimation: function(globalAnimationName, elementDelay) {
        document.querySelectorAll('[globalAnimationName="' + globalAnimationName + '"]').forEach(element => {

            if (this.animationTimeOut[globalAnimationName] == null) this.animationTimeOut[globalAnimationName] = Array();
            this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')] = setTimeout(() => {
                this.startElementOfGlobalAnimation(element);
            }, parseInt(element.getAttribute('globalAnimationOrder')) * elementDelay * 1000);

        })
    },

    /**
     * !! loopDuration must be small than the animationDuration
     */
    startGlobalAnimationLoop: function(globalAnimationName, elementDelay, loopDuration) {
        if (loopDuration > elementDelay) {
            this.startGlobalAnimation(globalAnimationName, elementDelay)
            AnimationController.animationInterval[globalAnimationName] = setInterval(() => {
                this.startGlobalAnimation(globalAnimationName, elementDelay)
            }, loopDuration * 1000);
        } else {
            console.warn('The loopDuration cannot be higher than element delay');
        }
    },

    stopGlobalAnimationLoop: function(globalAnimationName) {
        document.querySelectorAll('[globalAnimationName="' + globalAnimationName + '"]').forEach(element => {
            this.stopElementOfGlobalAnimation(element);
            clearTimeout(this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')])
        })
        clearInterval(AnimationController.animationInterval[globalAnimationName]);
    },

    endGlobalAnimationLoop: function(globalAnimationName) {
        clearInterval(AnimationController.animationInterval[globalAnimationName]);
    }





}