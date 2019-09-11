const PROXY_CONFIG = [
    {
        context: [
            "/sys/login",
            "/sys/logout",
            "/sys/userInfo",
            "/sys/menus",
            "/sys/route",
            "/admin/StaffCtrl/search",
            '/admin/StaffCtrl/save',
            '/admin/StaffCtrl/delete',
            '/admin/StaffCtrl/getDetailInfo'
        ],
        target: "http://localhost:7001",
        secure: false
    }
]
module.exports = PROXY_CONFIG;
