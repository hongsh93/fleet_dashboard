import { DefaultBodyType, rest } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  rest.get<DefaultBodyType, LocationsPathParams, LocationsResult>(
    "/locations",
    (req, res, ctx) => {
      // Please implement filtering feature here
      const [page = '1', search_string, is_starred] = req.url.search.slice(1).split("&").map(el => el.split("=")[1])

      let filteredLocations = locations;
      if (search_string !== "") {
        filteredLocations = filteredLocations.filter((location) =>
          location.name.toLowerCase().includes(search_string.toLowerCase()) || (location?.robot?.id ?? "").toLowerCase().includes(search_string.toLowerCase())
        );
      }

      if (is_starred === "true") {
        const starredIds = JSON.parse(sessionStorage.getItem("starred_location_ids") || "[]");
        filteredLocations = filteredLocations.filter((location) => starredIds.includes(location.id));
      }

      const limit = 6;
      const total_count = filteredLocations.length;
      const totalPages = Math.ceil(total_count / limit);
      const currentPage = Math.min(parseInt(page), totalPages);
      const offset = (currentPage - 1) * limit;

      const result: LocationsResult = {
        total_count,
        locations: filteredLocations.slice(offset, offset + limit),
      };

      return res(ctx.status(200), ctx.json(result));
    }
  ),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }
    
    const starred_ids = JSON.parse(sessionStorage.getItem("starred_location_ids") || "[]")
    const { id, will_stare } = JSON.parse(JSON.stringify(req.body))
    if (will_stare) {
      starred_ids.push(id)
      sessionStorage.setItem("starred_location_ids", JSON.stringify(starred_ids));
    } else {
      let idx = starred_ids.indexOf(id)
      starred_ids.splice(idx, 1)
      sessionStorage.setItem("starred_location_ids", JSON.stringify(starred_ids));
    }

    return res(ctx.status(200));
  }),
];
