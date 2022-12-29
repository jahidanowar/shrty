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

  return {
    getAllLinks,
    getLink,
    createLink,
  };
};
