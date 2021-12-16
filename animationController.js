const AnimationController = {
    animationInterval: Array(),
    animationTimeOut: Array(Array()),
    isAnimationLooping: Array(),
    isAnimationRunning: Array(),

    startAnimation: function(elementId, count = 0) {
        element = document.getElementById(elementId);
        if (element != null) {
            var animationClass = element.getAttribute('animationClass');
            if (animationClass != null) {
                element.classList.add(animationClass)
                if (element.style.animationPlayState == 'paused') element.style.animationPlayState = 'running';
                if (parseInt(count) > 0) {
                    setTimeout(() => {
                        AnimationController.pauseAnimation(elementId)
                    }, parseFloat(getComputedStyle(element).animationDuration) * 1000 * parseInt(count))
                }
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
            var animationClass = element.getAttribute('animationClass');
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
            var animationClass = element.getAttribute('animationClass');
            if (animationClass != null) {
                element.style.animationPlayState = 'paused';
            } else {
                console.warn('AnimationController : The element do not have animationClass attribute');
            }
        } else {
            console.warn('AnimationController : No element found');
        }
    },

    startAnimationByElement: function(element, count = 0) {
        if (element != null) {
            var animationClass = element.getAttribute('animationClass');
            if (animationClass != null) {
                element.classList.add(animationClass)
                if (element.style.animationPlayState == 'paused') element.style.animationPlayState = 'running';
                if (parseInt(count) > 0) {
                    setTimeout(() => {
                        AnimationController.pauseAnimationByElement(element)
                    }, parseFloat(getComputedStyle(element).animationDuration) * 1000 * parseInt(count))
                }
            } else {
                console.warn('AnimationController : The element do not have animationClass attribute');
            }
        } else {
            console.warn('AnimationController : No element found');
        }
    },

    stopAnimationByElement: function(element) {
        if (element != null) {
            var animationClass = element.getAttribute('animationClass');
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

    pauseAnimationByElement: function(element) {
        if (element != null) {
            var animationClass = element.getAttribute('animationClass');
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
        var animationClass = element.getAttribute('animationClass');
        if (animationClass != null) {
            if (element.style.animationPlayState == 'paused') element.style.animationPlayState = 'running';
            if (!element.classList.contains(animationClass)) {
                element.classList.add(animationClass)
                setTimeout(() => {
                    element.classList.remove(animationClass)
                }, parseFloat(getComputedStyle(element).animationDuration) * 1000);
            } else {
                element.classList.toggle(animationClass)
            }
        } else {
            console.warn('AnimationController : The element do not have animationClass attribute');
        }
    },

    stopElementOfGlobalAnimation: function(element) {
        var animationClass = element.getAttribute('animationClass');
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
        if ((this.isAnimationRunning[globalAnimationName] == false) || (this.isAnimationRunning[globalAnimationName] == undefined)) {
            this.isAnimationRunning[globalAnimationName] = true;
            this.animationTimeOut[globalAnimationName] = Array();
            document.querySelectorAll('[globalAnimationName="' + globalAnimationName + '"]').forEach(element => {
                if (this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')] != null) clearTimeout(this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')]);
                this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')] = setTimeout(() => {
                    this.startElementOfGlobalAnimation(element);
                    this.isAnimationRunning[globalAnimationName] = false;
                }, parseInt(element.getAttribute('globalAnimationOrder')) * elementDelay * 1000);

            })
        } else {
            console.warn('AnimationController : The animation is aleady running');
        }
    },

    /**
     * !! loopDuration must be smaller than the animationDuration
     */
    startGlobalAnimationLoop: function(globalAnimationName, elementDelay, loopDuration) {
        if (!this.isAnimationLooping[globalAnimationName]) {
            if (loopDuration > elementDelay) {
                this.startGlobalAnimation(globalAnimationName, elementDelay)
                this.isAnimationLooping[globalAnimationName] = true;
                AnimationController.animationInterval[globalAnimationName] = setInterval(() => {
                    this.startGlobalAnimation(globalAnimationName, elementDelay)
                }, loopDuration * 1000);
            } else {
                console.warn('AnimationController : The loopDuration cannot be higher than element delay');
            }
        } else {
            console.warn('AnimationController : The animation is already looping');
        }
    },

    stopGlobalAnimationLoop: function(globalAnimationName) {
        document.querySelectorAll('[globalAnimationName="' + globalAnimationName + '"]').forEach(element => {
            this.stopElementOfGlobalAnimation(element);
            clearTimeout(this.animationTimeOut[globalAnimationName][element.getAttribute('globalAnimationOrder')])
        })
        clearInterval(AnimationController.animationInterval[globalAnimationName]);
        this.isAnimationLooping[globalAnimationName] = false;
    },

    endGlobalAnimationLoop: function(globalAnimationName) {
        clearInterval(AnimationController.animationInterval[globalAnimationName]);
        this.isAnimationLooping[globalAnimationName] = false;
    },


    init: function() {
        document.querySelectorAll("[animationClass]").forEach(element => {
            element.startAnimation = function(count = 0) { AnimationController.startAnimationByElement(element, count) };
            element.stopAnimation = function() { AnimationController.stopAnimationByElement(element) };
            element.pauseAnimation = function() { AnimationController.pauseAnimationByElement(element) };
        })
    }


}