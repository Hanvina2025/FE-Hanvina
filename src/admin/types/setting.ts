export interface settingUpdate {
  newFooterFile: any | null,
  newLogoFile: any | null,
  newHomeFile: any | null,
  settingDtoString: {
    id?: string | number | undefined;
    buttonColor: string;
    headerColor: string;
    footerColor: string;
    logoName: string;
    footerName: string;
    footerInformation : string,
      facebook : string,
      zalo : string,
      youtube : string,
    fileKeysDelete: string[];
  };
}

  export interface setting {
    footerFile:
      | string
      | {
            createdUser: number,
            createdTime: string,
            updatedUser: number,
            updatedTime: string,
            id: number,
            entityId: number,
            type: number,
            fileKey: string,
            fileName: string,
            description: string | null,
            deleted: boolean
        };
  
    logoFile:
      | string
      | {
            createdUser: number,
            createdTime: string,
            updatedUser: number,
            updatedTime: string,
            id: number,
            entityId: number,
            type: number,
            fileKey: string,
            fileName: string,
            description: string | null,
            deleted: boolean
        };
  
    homeFile:
      | string
      | {
            createdUser: number,
            createdTime: string,
            updatedUser: number,
            updatedTime: string,
            id: number,
            entityId: number,
            type: number,
            fileKey: string,
            fileName: string,
            description: string | null,
            deleted: boolean
        };
  
      id?: string | number | undefined;
      buttonColor: string;
      headerColor: string;
      footerColor: string;
      logoName: string;
      footerName: string;
      footerInformation : string,
        facebook : string,
        zalo : string,
        youtube : string,
      fileKeysDelete: string[] | null;
  }

  export interface settingUpdateResponse {
    data: {
      createdUser: number,
        createdTime: string,
        updatedUser: null,
        updatedTime: string,
        id: number | string,
        buttonColor: string,
        headerColor: string,
        footerColor: string,
        logoName: string,
        footerName: string,
        footerInformation: string,
        facebook: string,
        zalo: string,
        youtube: string
    };
    message: string;
  }