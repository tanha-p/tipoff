export default class UserAgentUtil {

    static getBrowserIcon(browserName){
        switch(browserName){
            case 'Edge':
                return 'fab fa-edge'
            case 'Chrome':
                return 'fab fa-chrome'
            case 'Firefox':
                return 'fab fa-firefox'
            case 'Safari':
                return 'fab fa-safari'
            case 'IE':
                return 'fab fa-internet-explorer'
            default:
                return 'far fa-window-maximize'
        }
    }

    static getOSIcon(osName){
        switch(osName){
            case 'Windows':
                return 'fab fa-windows'
            case 'Android':
                return 'fab fa-android'
            case 'BlackBerry':
                return 'fab fa-blackberry'
            case 'Chromium OS':
                return 'fab fa-chrome'
            case 'Fedora':
                return 'fab fa-fedora'
            case 'Firefox OS':
                return 'fab fa-firefox'
            case 'FreeBSD':
                return 'fab fa-freebsd'
            case 'iOS':
                return 'fab fa-apple'
            case 'Mac OS':
                return 'fab fa-apple'
            case 'RedHat':
                return 'fab fa-redhat'
            case 'Ubuntu':
                return 'fab fa-ubuntu'
            case 'Windows [Phone/Mobile]':
                return 'fab fa-windows'
            default:
                return 'far fa-window-maximize'
        }
    }

    static getDeviceIcon(deviceName){
        switch(deviceName){
            case 'console':
                return 'fas fa-gamepad'
            case 'mobile':
                return 'fas fa-mobile'
            case 'tablet':
                return 'fas fa-tablet-alt'
            case 'smarttv':
                return 'fas fa-tv'
            case 'wearable':
                return 'far fa-clock'
            case 'embedded':
                return 'fas fa-microchip'
            
            default:
                return 'fas fa-laptop'
        }
    }
}