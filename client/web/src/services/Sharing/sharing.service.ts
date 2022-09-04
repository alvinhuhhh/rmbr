import axios, { AxiosResponse } from "axios";
import appConfig from "../../config";
import { ISharing } from "../../types/sharing.types";
import { IList } from "../../types/lists.types";

export default class SharingService {
  public static async GetSharedLists(email: string): Promise<Array<IList>> {
    try {
      let response = await axios.get(`${appConfig.api.url}/sharing/${email}`);
      console.log(`[GetSharedLists] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
    return [];
  }

  public static async GetShareById(sharingId: number): Promise<ISharing | undefined> {
    try {
      let response = await axios.get(`${appConfig.api.url}/sharing/${sharingId}`);
      console.log(`[GetShareById] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
    return;
  }

  public static async CreateShare(data: ISharing): Promise<AxiosResponse> {
    try {
      let response = await axios.post(`${appConfig.api.url}/sharing`, data);
      console.log(`[CreateShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }

  public static async UpdateShare(data: ISharing): Promise<AxiosResponse> {
    try {
      let response = await axios.put(`${appConfig.api.url}/sharing`, data);
      console.log(`[UpdateShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }

  public static async DeleteShare(sharingId: number): Promise<AxiosResponse> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/sharing/${sharingId}`);
      console.log(`[DeleteShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }

  public static async CheckIfUserExists(email: string): Promise<AxiosResponse> {
    try {
      let response = await axios.get(`${appConfig.api.url}/user/${email}`);
      console.log(`[CheckIfUserExists] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }
}
