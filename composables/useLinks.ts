import geoip from "geoip-lite";
import { Database } from "~~/types/supabase";

export const useLinks = () => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  const getAllLinks = async () => {
    return useAsyncData("links", async () => {
      if (!user.value) {
        throw createError({
          statusCode: 401,
          message: "Unauthorized",
        });
      }

      const { data } = await client
        .from("links")
        .select("*")
        .eq("user_id", user.value.id)
        .order("created_at", { ascending: false });
      return data;
    });
  };

  const getLink = async (key: string) => {
    return useAsyncData(`links/${key}`, async () => {
      const { data } = await client
        .from("links")
        .select("*, clicks(*)")
        .eq("key", key)
        .single();

      return data;
    });
  };

  const createLink = async (longUrl: string, key: string) => {
    if (!user.value) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const res = await client
      .from("links")
      .insert({
        long_url: longUrl,
        key,
        user_id: user.value.id,
      })
      .single();

    return res;
  };

  const redirect = async (key: string) => {
    const { data } = await client
      .from("links")
      .select("*")
      .eq("key", key)
      .single();
    if (data) {
      const clickData: any = {};

      const ua = useUserAgent();

      console.log({ ua });

      if (ua) {
        clickData.user_agent = ua.userAgent;
        clickData.ip = ua.ip;

        if (ua.ip) {
          const geo = geoip && geoip.lookup(ua.ip);
          if (geo) {
            clickData.country = geo.country;
            clickData.city = geo.city;
          }
        }
      }

      const click = await client.from("clicks").insert({
        link_id: data.id,
        ...clickData,
      });

      console.log({ click });

      useExternalRedirect(data.long_url, 302);
    } else {
      throw createError({
        statusCode: 404,
        message: "Link not found",
      });
    }
  };

  return {
    getAllLinks,
    getLink,
    createLink,
    redirect,
  };
};
