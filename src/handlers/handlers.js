export const rateHandle = async (id, title, name, rating) => {
  if (!rating) {
    const userRate = prompt(`Rate ${title || name} from 0.5 to 10`);
    if (userRate > 0.5 && userRate < 10) {
      try {
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${
            JSON.parse(localStorage.getItem("guestSession"))["guest_session_id"]
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              value: userRate,
            }),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${
          JSON.parse(localStorage.getItem("guestSession"))["guest_session_id"]
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
};

export const turnNextPage = (setPage, arrange, page, discovers) => {
  setPage((prev) => {
    const nextPage =
      prev[arrange.filter || "all"] >= discovers.total_pages
        ? discovers.total_pages
        : prev[arrange.filter || "all"] + 1;

    return {
      ...prev,
      [arrange.filter || "all"]: nextPage,
    };
  });
};

export const turnPrevPage = (setPage, arrange, page) => {
  setPage((prev) => {
    const prevPage =
      prev[arrange.filter || "all"] <= 1
        ? 1
        : prev[arrange.filter || "all"] - 1;

    return {
      ...prev,
      [arrange.filter || "all"]: prevPage,
    };
  });
};
