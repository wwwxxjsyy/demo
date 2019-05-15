function Login(container){
    this.container = container;
    this.init();
}
Login.template = `
    <div class="sign-content">
    <div class="logo">
        <img src="https://cas.1000phone.net/cas/images/login/logo.png" alt="">
    </div>
    <form id="login-form">
        <div class="form-group">
            <label for="sign-login-username">用户名</label>
            <input type="text" class="form-control" id="sign-login-username" placeholder="请输入用户名">
        </div>
        <div class="form-group">
            <label for="sign-login-password">密码</label>
            <input type="password" class="form-control" id="sign-login-password" placeholder="请输入密码">
        </div>
        <p class="bg-info" id="toggle">立即注册</p>
        <button type="submit" class="btn btn-primary sign-btn">登陆</button>
    </form>
    </div>
`

Login.prototype = {
    init:function(){
        this.create();
        this.toggleSign();
    },
    create:function(){
        this.container.html("");
        this.el = $("<div></div>");
        this.el.append(Login.template);
        this.container.append(this.el);
    },
    toggleSign:function(){
        this.el.find("#toggle").on("click",this.handleToggleSignCb.bind(this));
    },
    handleToggleSignCb(){
        new Page().createContent(false);
    }
}