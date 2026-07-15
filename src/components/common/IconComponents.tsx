import React, { JSX } from 'react' // ReactとJSX型を読み込む // JSX型は「画面に表示するReact要素」であることを表す型

// Material UIで用意されているアイコンを読み込む
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";

import { ExpenseCategory, IncomeCategory } from '../../types'; // 収入・支出カテゴリの型を読み込む // これにより、存在しないカテゴリ名を設定できないようになる

/** 
 * カテゴリ名と表示するアイコンを対応付けるオブジェクト 
 * 
 * Record<Key, Value>とは 
 * 「Keyをキーとして、Valueを値に持つオブジェクト」を表す型。
 *  
 * 今回の場合 
 * Key ：収入カテゴリ または 支出カテゴリ 
 * Value ：表示するアイコン（JSX.Element） 
 * 
 *  例）
 * 「食費」→ ハンバーガーアイコン
 * 「給与」→ 仕事アイコン 
 */

const IconComponents:Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
    // 支出カテゴリ
    食費: <FastfoodIcon fontSize="small" />,
    日用品: <AlarmIcon fontSize="small" />,
    住居費: <AddHomeIcon fontSize="small" />,
    交際費: <Diversity3Icon fontSize="small" />,
    娯楽: <SportsTennisIcon fontSize="small" />,
    交通費: <TrainIcon fontSize="small" />,

    // 収入カテゴリ
    給与: <WorkIcon fontSize="small" />,
    副収入: <AddBusinessIcon fontSize="small" />,
    お小遣い: <SavingsIcon fontSize="small" />,
};

/** * 
 * 他のファイルから利用できるようにエクスポート
 * 
 * 使用例 
 * IconComponents["食費"] 
 * 
 * と書くと、FastfoodIcon（食費アイコン）が取得できる。 
 */
export default IconComponents