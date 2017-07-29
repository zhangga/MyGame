/**
 *
 * @author 
 *
 */
class GameSkin {
    public constructor() {
    }
    public static getBaseTabButtonSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" states="up,down,upAndSelected,downAndSelected" currentState="upAndSelected" xmlns:e="http://ns.egret.com/eui" width="87" height="87">
	        <e:Group bottom="0" horizontalCenter="0" width="87" height="87">
		        <e:Image source.up="" source.down="" source.upAndSelected="public_btn_bg1_png" source.downAndSelected="public_btn_bg1_png" horizontalCenter="0" verticalCenter="0"/>
		        <e:Image source="public_btn_bg_png" horizontalCenter="0" verticalCenter="0"/>
		        <e:Image scaleX="1" scaleY="1" touchEnabled="false" source="${resName}" y="0" horizontalCenter="0"/>
	        </e:Group>
        </e:Skin>`;
        return exmlText;
    }
    public static getTabButtonSkin2(labelName: string, selectedImg: string = "radiobutton_select_down2_png", unselectedImg: string = "radiobutton_unselect2_jpg") {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.Common_TabButtonSkin2" states="up,down,disabled,downAndSelected" currentState="disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
            <e:Group width="100%" height="100%" horizontalCenter="0" x="0" y="0">
                <e:Image fillMode="scale" alpha="1"
                    source.up="${unselectedImg}"
                    source.down="${selectedImg}"
                    source.disabled="${selectedImg}"
                    source.downAndSelected="${selectedImg}"
                    source="${unselectedImg}" scale9Grid.up="29,5,69,32" width="100%" />
                <e:Label textAlign="center" verticalAlign="middle" fontFamily="Microsoft YaHei" textColor="0xe9deb3" text="${labelName}" size="22" horizontalCenter="0" verticalCenter="0" bold="true"/>
            </e:Group>
        </e:Skin>`;
        return exmlText;
    }
    public static getTabHallBtnSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" states="up,down,upAndSelected,downAndSelected" xmlns:e="http://ns.egret.com/eui" width="87" height="87">
	        <e:Group bottom="0" horizontalCenter="0" width="87" height="87">
		        <e:Image source.up="newactivity_iconbtn1_png" source.down="newactivity_iconbtn2_png" source.upAndSelected="newactivity_iconbtn2_png" source.downAndSelected="newactivity_iconbtn2_png" horizontalCenter="0" verticalCenter="0"/>
		        <e:Image scaleX="1" scaleY="1" touchEnabled="false" source="${resName}" y="0" horizontalCenter="0"/>
	        </e:Group>
        </e:Skin>`;
        return exmlText;
    }


    public static getActivityButtonSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
        <e:Skin class="skins.${resName}" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
           <e:Image width="79" height="79" source="newactivity_iconbtn1_png" horizontalCenter="0" verticalCenter="0"/>
            <e:Image width="100%" height="100%" alpha.disabled="0.5"
                    source.disabled="${resName}" source.up="${resName}" 
                    width.down="90%" height.down="90%" source.down="${resName}" verticalCenter.up="0" horizontalCenter.up="0" verticalCenter.disabled="0" horizontalCenter.disabled="0" verticalCenter.down="0" horizontalCenter.down="0"/>
            <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
                    size="20"
                    textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
            <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
        </e:Skin>`;
        return exmlText;
    }
    public static getActivityButtonNoBgSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
        <e:Skin class="skins.${resName}" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
            <e:Image width="100%" height="100%" alpha.disabled="0.5"
                    source.disabled="${resName}" source.up="${resName}" 
                    width.down="90%" height.down="90%" source.down="${resName}" verticalCenter.up="0" horizontalCenter.up="0" verticalCenter.disabled="0" horizontalCenter.disabled="0" verticalCenter.down="0" horizontalCenter.down="0"/>
            <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
                    size="20"
                    textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
            <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
        </e:Skin>`;
        return exmlText;
    }

    public static getTopRankGiftRadioButtonSkin(resName: string, title: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:e="http://ns.egret.com/eui">
             <e:Group width="100%" height="100%" horizontalCenter.upAndSelected="0" y.upAndSelected="0" horizontalCenter="0" x="0" y="0" scaleX="1" scaleY="1">
                <e:layout>
                    <e:HorizontalLayout verticalAlign="middle"/>
                </e:layout>
                <e:Image fillMode="scale" alpha="1" alpha.disabled="0.5" alpha.down="0.7"
                    source.up="sevDay_title_tab_trapezoida_png"
                    source.down="sevDay_title_tab_trapezoida_png"
                    source.disabled="sevDay_title_tab_trapezoida_png"
                    source.upAndSelected="sevDay_title_tab_trapezoidl_png"
                    source.downAndSelected="sevDay_title_tab_trapezoidl_png"
                    source.disabledAndSelected="sevDay_title_tab_trapezoidl_png" 
                    source="sevDay_title_tab_trapezoida_png"/>
                <e:Label id="labelDisplay" size="20" textColor="0xE9DEB3"
                        textAlign="center" verticalAlign="middle"
                        fontFamily="Microsoft YaHei"/>
             </e:Group>
             <e:Label text="${title}" strokeColor="0x2A0505" stroke="0" size="22" touchEnabled="false" fontFamily="Microsoft YaHei" textAlign="center" scaleX="1" scaleY="1" bold="true" textColor="0xE9DEB3" verticalCenter="0" horizontalCenter="0"/>
        </e:Skin>`;
        return exmlText;
    }

    public static getGemSyntheticBtn(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" width="182" height="50" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:e="http://ns.egret.com/eui">
             <e:Group width="182" height="50" x="0" y="0"/>
             <e:Image scaleX="1" scaleY="1" horizontalCenter="0" touchEnabled="false" bottom="1" width="160" source="public_line_1_jpg" height="3"/>
             <e:Group width="100%" height="100%" horizontalCenter.upAndSelected="0" y.upAndSelected="0" horizontalCenter="0" x="0" y="0" scaleX="1" scaleY="1">
                <e:layout>
                    <e:HorizontalLayout verticalAlign="middle"/>
                </e:layout>
                <e:Image fillMode="scale" alpha="1" alpha.disabled="0.5" alpha.down="0.7"
                    source.up=""
                    source.down=""
                    source.disabled=""
                    source.upAndSelected="forge_gem_selected_bg_png"
                    source.downAndSelected="forge_gem_selected_bg_png"
                    source.disabledAndSelected="forge_gem_selected_bg_png" 
                    source=""/>
                <e:Label id="labelDisplay" size="20" textColor="0xE9DEB3"
                        left="16" verticalAlign="middle"
                        fontFamily="Microsoft YaHei"/>
             </e:Group>
             <e:Label id="label_name" width="152" height="20" text="2级木系宝石" size="20"  touchEnabled="false" verticalCenter="0" fontFamily="Microsoft YaHei" left="16" textColor="0xe9deb3"/>
             
        </e:Skin>`;
        return exmlText;
    }

    public static getActivityHallRadioButtonSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:e="http://ns.egret.com/eui">
             <e:Group width="100%" height="100%" horizontalCenter.upAndSelected="0" y.upAndSelected="0" horizontalCenter="0" x="0" y="0" scaleX="1" scaleY="1">
                <e:layout>
                    <e:HorizontalLayout verticalAlign="middle"/>
                </e:layout>
                <e:Image fillMode="scale" alpha="1" alpha.disabled="0.5" alpha.down="0.7"
                    source.up="public_btn_bg_png"
                    source.down="public_btn_bg_png"
                    source.disabled="public_btn_bg_png"
                    source.upAndSelected="public_btn_bg1_png"
                    source.downAndSelected="public_btn_bg1_png"
                    source.disabledAndSelected="public_btn_bg1_png" 
                    source="public_btn_bg_png"/>
                <e:Label id="labelDisplay" size="20" textColor="0x707070"
                        textAlign="center" verticalAlign="middle"
                        fontFamily="Tahoma"/>
             </e:Group>
            <e:Image scaleX="1" scaleY="1" touchEnabled="false" verticalCenter="6" source="${resName}" horizontalCenter="0"/>
        </e:Skin>`;
        return exmlText;
    }

    public static getCreateRoleRadioButtonSkin(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.CreateRoleRadioButtonSkin" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected"
                currentState="disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" height="110"
                width="115">
            <e:Group width="100%" height="100%" horizontalCenter.upAndSelected="0" y.upAndSelected="0" horizontalCenter="0"
                    x="0" y="0" scaleX="1" scaleY="1">
                    <e:Image fillMode="scale" source="function_icon_bg_png" horizontalCenter="0" verticalCenter="0" />
            </e:Group>
        </e:Skin>`;
        return exmlText;
    }

    public static getActivitySpringRadioButtonSkin(resName: string) {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="skins.${resName}" states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:e="http://ns.egret.com/eui">
             <e:Group width="100%" height="100%" horizontalCenter.upAndSelected="0" y.upAndSelected="0" horizontalCenter="0" x="0" y="0" scaleX="1" scaleY="1">
                <e:layout>
                    <e:HorizontalLayout verticalAlign="middle"/>
                </e:layout>
                <e:Image fillMode="scale" alpha="1" alpha.disabled="0.5" alpha.down="0.7"
                    source.up="spring_tab_unselect_png"
                    source.down="spring_tab_unselect_png"
                    source.disabled="spring_tab_unselect_png"
                    source.upAndSelected="spring_tab_selected_png"
                    source.downAndSelected="spring_tab_selected_png"
                    source.disabledAndSelected="spring_tab_selected_png" 
                    source="spring_tab_unselect_png"/>
                <e:Label id="labelDisplay" size="20" textColor="0x707070"
                        textAlign="center" verticalAlign="middle"
                        fontFamily="Tahoma"/>
             </e:Group>
            <e:Image scaleX="1" scaleY="1" touchEnabled="false" verticalCenter="6" source="${resName}" horizontalCenter="0"/>
        </e:Skin>`;
        return exmlText;
    }


    public static getButtonSkin3(upRes: string, disRes: string, downScale: string = "90%"): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
<e:Skin class="skins.${upRes}" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
    <e:Image width="100%" height="100%" alpha.disabled="1"
             source.disabled="${disRes}" source.up="${upRes}" 
             width.down="${downScale}" height.down="${downScale}" source.down="${upRes}" verticalCenter.up="0" horizontalCenter.up="0" verticalCenter.disabled="0" horizontalCenter.disabled="0" verticalCenter.down="0" horizontalCenter.down="0"/>
    <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
             size="20" 
             textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
    <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
</e:Skin>`;
        return exmlText;
    }
    public static getNormalButtonSkin(resName: string): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
<e:Skin class="skins.${resName}" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
    <e:Image width="100%" height="100%" alpha.disabled="0.5"
             source.disabled="${resName}" source.up="${resName}" 
             width.down="90%" height.down="90%" source.down="${resName}" verticalCenter.up="0" horizontalCenter.up="0" verticalCenter.disabled="0" horizontalCenter.disabled="0" verticalCenter.down="0" horizontalCenter.down="0"/>
    <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
             size="20"
             textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
    <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
</e:Skin>`;
        return exmlText;
    }
    public static getNormalProgressBarSkin(resName: string): string {
        var exmlText: string = `<?xml version= "1.0" encoding= "utf-8" ?>
            <e:Skin class="skins.${resName}" xmlns:e="http://ns.egret.com/eui">
                <e:Image source= "${resName}"  scale9Grid= "1,1,4,4" width= "100%" alpha="0"
        height = "100%" verticalCenter= "0" />
            <e:Image id= "thumb" height= "100%" width= "100%" source= "${resName}" scale9Grid= "8,6,3,4" />
                <e:Label id= "labelDisplay" textAlign= "center" verticalAlign= "middle"
        size = "15" fontFamily= "Tahoma" textColor= "0x707070" 
        horizontalCenter = "0" verticalCenter= "0" />
            </e:Skin>`;


        return exmlText;
    }
    public static getNormalProBarSkin(bgName: string, resName: string): string {
        var exmlText: string = `<?xml version= "1.0" encoding= "utf-8" ?>
            <e:Skin class="skins.${resName}" xmlns:e="http://ns.egret.com/eui">
                <e:Image source= "${bgName}"  scale9Grid= "1,1,4,4" width= "100%" alpha="0"
        height = "100%" verticalCenter= "0" />
            <e:Image id= "thumb" height= "100%" width= "100%" source= "${resName}" scale9Grid= "8,6,3,4" />
                <e:Label id= "labelDisplay" textAlign= "center" verticalAlign= "middle"
        size = "15" fontFamily= "Tahoma" textColor= "0x707070" 
        horizontalCenter = "0" verticalCenter= "0" />
            </e:Skin>`;
        return exmlText;
    }
    public static getDamageBarSkin(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.BossProgress" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" width="220">
                <e:Label id="desc" size="18" fontFamily="Microsoft YaHei" textColor="0xffffff" text=""  top="3" width="100%"/>
                <e:Image id="line" source="public_line_png" width="100%"  top="-3"/>
            </e:Skin>`;
        return exmlText;
    }
    public static getFightingChangeBarSkin(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.FightingBar" width="688" height="1100" xmlns:e="http://ns.egret.com/eui"
                    xmlns:w="http://ns.egret.com/wing" states="item,box,equip">
                <e:Group horizontalCenter="0">
                    <e:Image source="word_zongzhandouli_png" y="0" x="0" />
                    <e:BitmapLabel id="change_label" text="111" letterSpacing="-6" scaleX="0.8" scaleY="0.8" font="font_fight_green_fnt" x="200" y="28"/>
                    <e:BitmapLabel id="fightingNum" font="font_fight_yellow_fnt" text="111" letterSpacing="-6" scaleX="0.8" scaleY="0.8" x="170" y="28"/>
                </e:Group>
            </e:Skin>`;
        return exmlText;
    }
    public static getGameLoadingBar(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.GameLoadingBar" width="688" height="1100" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" states="item,box,equip" >
                <e:Image source="login_bg_jpg"/>
                <e:Image source="logo_png" y="180" horizontalCenter="0"/>
                <e:ProgressBar id="bar" y="864" horizontalCenter="0"/>
                <e:Label text="首次加载游戏时间较长，请耐心等待" y="793" textColor="0xe90cf4" fontFamily="KaiTi" size="24" horizontalCenter="0" stroke="1" strokeColor="0xffffff"/>
                <e:Label id="loadtext" text="正在连接服务器.." y="910" fontFamily="Microsoft YaHei" size="22" horizontalCenter="0" stroke="1" strokeColor="0xffffff" textColor="0xc68ffc"/>
            </e:Skin>`;
        return exmlText;
    }
    public static getGameLoadingProBar(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.GameLoadingProBar" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
                <e:Image scale9Grid="1,1,4,4" verticalCenter="0" source="common_thumb_bg_jpg" left="18" right="18" height="18"/>
                <e:Image id="thumb" source="common_thumb_jpg" verticalCenter="1" height="18" left="18" right="18" x="18" y="3"/>
                <e:Image scale9Grid="1,1,4,4" verticalCenter="0" x="0" y="10" source="progress_style_1_png"/>
                <e:Group id="animLayer" touchChildren="false" touchEnabled="false" verticalCenter="1" y="12" left="18" right="18"/>
            </e:Skin>`;
        return exmlText;
    }
    /**过场动画皮肤**/
    public static getLoadingMapView(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.GuochangView" width="688" height="1100" xmlns:e="http://ns.egret.com/eui"
                    xmlns:w="http://ns.egret.com/wing">
                <e:Group id="loading_bar">
                    <e:Image source="con_mark_png" locked="true" />
                    <e:Image source="logo_png" y="200" horizontalCenter="0"/>
                    <e:Label text="正在载入场景..." y="620" fontFamily="Microsoft YaHei" size="26" horizontalCenter="0"/>
                </e:Group>
                <e:Scroller id="poetry_scroll" width="300" height="500" x="120" y="150" touchChildren="false" touchEnabled="false">
                    <e:Group>
                        <e:Image id="backImg" source="" />
                        <e:Image id="poetryImg" source="" />
                    </e:Group>
                </e:Scroller>
            </e:Skin>`;
        return exmlText;
    }
    /**副本倒计时皮肤**/
    public static getDupTimeBar(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.DupTimeBar" width="688" height="1100" xmlns:e="http://ns.egret.com/eui">
                <e:Group >
                    <e:Image source="public_name_bg_png" scale9Grid="51,6,202,38" width="380"/>
                    <e:Label id="txt" text="副本剩余时间：00：00" fontFamily="Microsoft YaHei" size="22" horizontalCenter="0" verticalCenter="0"/>
                </e:Group>
            </e:Skin>`;
        return exmlText;
    }
    /**头像框皮肤**/
    public static getHeadIconBar(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8"?>
            <e:Skin class="skins.HeadIconItemSkin" xmlns:e="http://ns.egret.com/eui" width="140" height="130">
                <e:Image id="head_icon" y="0" horizontalCenter="0" width="90" height="90" source="r5_headIcon_jpg" />
                    <e:Image source="bag_defaultframe_png" horizontalCenter="0" scale9Grid="10,10,64,64" width="90" height="90" locked="true" />
                    <e:Group y="100" horizontalCenter="0">
                        <e:Label id="name_label" text="玩家名称" fontFamily="Microsoft YaHei" size="22" textColor="0x28e828" />
                        <e:layout>
                            <e:HorizontalLayout/>
                        </e:layout>
                    </e:Group>
            </e:Skin>`;
        return exmlText;
    }
    // public getNormalButtonCloseSkin(): string {
    //     return this.getNormalButtonSkin("common_button_close_png");
    // }
    // public getNormalButtonBackSkin(): string {
    //     return this.getNormalButtonSkin("Chat_Button_Back_png");
    // }
    // public getNormalButtonTrueSkin(): string {
    //     return this.getNormalButtonSkin("common_button_true_png");
    // }
    // public getNormalButtonpopubarbackSkin(): string {
    //     return this.getNormalButtonSkin("common_popurbarback_png");
    // }
    public static getServerButtonSkin(upRes: string, downRes: string): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
<e:Skin class="skins.${upRes}" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
    <e:Image width="100%" height="100%" alpha.disabled="1"
             source.disabled="${upRes}" source.up="${upRes}" 
             source.down="${downRes}" verticalCenter.up="0" horizontalCenter.up="0" verticalCenter.disabled="0" horizontalCenter.disabled="0" verticalCenter.down="0" horizontalCenter.down="0"/>
    <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
             size="28" 
             textColor="0xe9deb3" verticalAlign="middle" textAlign="center"/>
    <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
</e:Skin>`;
        return exmlText;
    }

    public static getServerButtonSkin1(): string {
        var exmlText: string = `<?xml version="1.0" encoding="utf-8" ?>
<e:Skin class="skins.serverBtn" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
	<e:Image width="100%" height="100%" source="login_server_btn_up_png" source.down="login_server_btn_png" source.disabled="login_server_btn_up_png"/>
	<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0" textColor="0xffffff" size="20" fontFamily="Microsoft YaHei"/>
</e:Skin>`;
        return exmlText;
    }
}
