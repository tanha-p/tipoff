import TestUserAgentUtil from '../useragent-util';

describe("UserAgentUtil", () => {

    it("should return proper browser icon", () => {
        expect(TestUserAgentUtil.getBrowserIcon('Edge')).toEqual('fab fa-edge');
        expect(TestUserAgentUtil.getBrowserIcon('Chrome')).toEqual('fab fa-chrome');
        expect(TestUserAgentUtil.getBrowserIcon('Firefox')).toEqual('fab fa-firefox');
        expect(TestUserAgentUtil.getBrowserIcon('Safari')).toEqual('fab fa-safari');
        expect(TestUserAgentUtil.getBrowserIcon('IE')).toEqual('fab fa-internet-explorer');
    });

    it("should return default icon when browser is not found", () => {
        expect(TestUserAgentUtil.getBrowserIcon('Unknown')).toEqual('far fa-window-maximize');
        expect(TestUserAgentUtil.getBrowserIcon()).toEqual('far fa-window-maximize');
    });

    it("should return proper OS Icon", () => {
        expect(TestUserAgentUtil.getOSIcon('Windows')).toEqual('fab fa-windows');
        expect(TestUserAgentUtil.getOSIcon('Android')).toEqual('fab fa-android');
        expect(TestUserAgentUtil.getOSIcon('BlackBerry')).toEqual('fab fa-blackberry');
        expect(TestUserAgentUtil.getOSIcon('Chromium OS')).toEqual('fab fa-chrome');
        expect(TestUserAgentUtil.getOSIcon('Fedora')).toEqual('fab fa-fedora');
        expect(TestUserAgentUtil.getOSIcon('FreeBSD')).toEqual('fab fa-freebsd');
        expect(TestUserAgentUtil.getOSIcon('iOS')).toEqual('fab fa-apple');
        expect(TestUserAgentUtil.getOSIcon('Mac OS')).toEqual('fab fa-apple');
        expect(TestUserAgentUtil.getOSIcon('RedHat')).toEqual('fab fa-redhat');
        expect(TestUserAgentUtil.getOSIcon('Ubuntu')).toEqual('fab fa-ubuntu');
        expect(TestUserAgentUtil.getOSIcon('Windows [Phone/Mobile]')).toEqual('fab fa-windows');
    });

    it("should return default icon when os is not found", () => {
        expect(TestUserAgentUtil.getOSIcon('Unknown')).toEqual('far fa-window-maximize');
        expect(TestUserAgentUtil.getOSIcon()).toEqual('far fa-window-maximize');
    });

    it("should return proper device icon", () => {
        expect(TestUserAgentUtil.getDeviceIcon('console')).toEqual('fas fa-gamepad');
        expect(TestUserAgentUtil.getDeviceIcon('mobile')).toEqual('fas fa-mobile');
        expect(TestUserAgentUtil.getDeviceIcon('tablet')).toEqual('fas fa-tablet-alt');
        expect(TestUserAgentUtil.getDeviceIcon('smarttv')).toEqual('fas fa-tv');
        expect(TestUserAgentUtil.getDeviceIcon('wearable')).toEqual('far fa-clock');
        expect(TestUserAgentUtil.getDeviceIcon('embedded')).toEqual('fas fa-microchip');
    });

    it("should return default icon when os is not found", () => {
        expect(TestUserAgentUtil.getDeviceIcon('Unknown')).toEqual('fas fa-laptop');
        expect(TestUserAgentUtil.getDeviceIcon()).toEqual('fas fa-laptop');
    });

});