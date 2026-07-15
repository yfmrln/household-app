// Material UIのコンポーネントを読み込む
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import React, { CSSProperties } from 'react'

// Material UIのアイコン
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';

// 画面遷移（ルーティング）に使用するコンポーネント
import { NavLink } from 'react-router-dom';

/** 
 * Sidebarコンポーネントが受け取るProps 
 */
interface SidebarProps {
  drawerWidth: number,
  mobileOpen: boolean,
  handleDrawerToggle: () => void,
}

/** 
 * サイドメニュー1件分の型 
*/
interface menuItem {
  text: string,  // メニュー名
  path: string, // 遷移先URL
  icon: React.ComponentType,  // 表示するアイコン
}

/** 
 * サイドバーコンポーネント 
*/
const Sidebar = ({drawerWidth,mobileOpen,handleDrawerToggle}:SidebarProps) => {
    
    /** 
     * Drawerの開閉アニメーション終了時に実行される関数 
     * 現在は何も処理していない 
     */
    const handleDrawerTransitionEnd = () => {
      // Drawer の遷移完了時の処理
    };

    /** 
     * NavLink共通のCSS 
     */
    const baseLinkStyle:CSSProperties = {
      textDecoration: "none", // 下線を消す
      color: "inherit", // 親要素の文字色を使用
      display: "block",
    }

    /** 
     * 現在表示中のページだけ背景色を変更するCSS 
     */
    const activeLinkStyle:CSSProperties = {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }

    /** 
     * モバイル用Drawerを閉じる 
     */
    const handleDrawerClose = () => {
      handleDrawerToggle();
    };

    /** 
     * サイドバーに表示するメニュー一覧 
     * 
     * 新しい画面を追加したい場合は 
     * この配列に追加するだけでよい。 
     */
    const MenuItems:menuItem[] = [
      {text: "Home", path: "/", icon: HomeIcon},
      {text: "Report", path: "/report", icon: EqualizerIcon},
    ]

    /**
     * サイドバーの中身  
     * モバイル用DrawerとPC用Drawerで 
     * 同じ内容を表示したいため、
     * drawerという変数にまとめている。 
     * */
    const drawer = (
    <div>
      {/* AppBarと高さを合わせるための余白 */}
      <Toolbar />
      <Divider />
      {/* メニュー一覧 */}
      <List>
        {/* MenuItemsを1件ずつ画面へ表示 */}
        {MenuItems.map((item, index) => (
          <NavLink key={item.text} to={item.path} style={({isActive}) => {
            console.log("選択されたメニューは",item.text, isActive)
            return {
              ...baseLinkStyle,
              ...(isActive ? activeLinkStyle: {})
            }
          }}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                {/* アイコン表示 */}
                <ListItemIcon>
                  {/* index % 2 === 0 ? <InboxIcon /> : <MailIcon /> */}
                  <item.icon />
                </ListItemIcon>
                {/* メニュー名表示 */}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  /** 
   * Drawer（サイドメニュー）を表示 
  */
  return (
      <Box
        component="nav" // navタグとして出力
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* モバイル用 */}
        <Drawer
          variant="temporary"                         // 一時的に表示するDrawer
          open={mobileOpen}                           // 開閉状態
          onTransitionEnd={handleDrawerTransitionEnd} // アニメーション終了時
          onClose={handleDrawerClose}                 // 外側をクリックすると閉じる
          sx={{ // スマホのみ表示
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          // 閉じてもDOMを保持して高速表示
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>

        {/* PC用 */}
        <Drawer
        // 常に表示するDrawer
          variant="permanent"
          sx={{ // PCのみ表示
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  )
}

// 他のファイルから利用できるようにする
export default Sidebar