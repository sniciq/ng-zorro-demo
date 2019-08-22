const PROXY_CONFIG = [
    {
        context: [
            "/sys/menus",
            "/sys/route",
            "/admin/StaffCtrl/search"
        ],
        target: "http://localhost:7001",
        secure: false
    }
]
module.exports = PROXY_CONFIG;
