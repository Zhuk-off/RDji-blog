export interface IHeaderFooterContext {
  data: IData;
  status?: number;
}

export interface IData {
  header?: IHeader;
  footer?: IFooter;
}

export interface IHeader {
  [x: string]: any;
  siteLogoUrl: string;
  siteTitle: string;
  siteDescription: string;
  favicon: string;
  headerMenuItems: IMenuItem[];
}

export interface IFooter {
  footerMenuItems: IMenuItem[];
  copyrightText: string | boolean;
  socialLinks: socialLink[];
  sidebarOne?: any;
  sidebarTwo?: any;
}

interface socialLink {
  iconName: string;
  iconUrl: string;
}

interface IMenuItem extends IMenuItemChildren {
  children?: IMenuItemChildren[];
}

interface IMenuItemChildren {
  ID: number;
  title: string;
  url: string;
  pageSlug: string;
  pageID: number;
}

export enum LocationMenu {
  HEADER_HCMS = 'HCMS_MENU_HEADER',
  FOOTER_HCMS = 'HCMS_MENU_FOOTER',
}

/**
 * Для меню, которое получили из WPGraphQL
 */
export interface IWPMenuItem {
  node: {
    id: string;
    label: string;
    parentId: string | null;
    uri: string;
    childItems?: { edges: IWPMenuItem[] };
  };
}
