export const type={
    SWITCH_MENU:'SWITCH_MENU'
}

export function switchMenu(menuName){
    return {
        type:'SWITCH_MENU',
        menuName
    }
}