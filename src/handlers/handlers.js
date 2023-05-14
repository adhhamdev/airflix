export const rateHandle = async (id, title, name, rating) => {
    if(!rating) {
      const userRate = prompt(`Rate ${title || name} from 0.5 to 10`);
      if(userRate > 0.5 && userRate < 10) {
        await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${JSON.parse(localStorage.getItem('guestSession'))["guest_session_id"]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            "value": userRate
          })
        });
      }
      
    } else {
      await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${JSON.parse(localStorage.getItem('guestSession'))["guest_session_id"]}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      });
    }
  }

 export const turnNextPage = (setPage, arrange, page, discovers) => {
    setPage(prev => {
      return (
        {
          ...prev,
          [arrange.filter ? arrange.filter : 'all']: page[arrange.filter ? arrange.filter : 'all'] >= discovers.total_pages ? discovers.total_pages : page[arrange.filter ? arrange.filter : 'all'] + 1
        }
      )
    })
}

export const turnPrevPage = (setPage, arrange, page) => {
    setPage(prev => {
      return (
        {
          ...prev,
          [arrange.filter ? arrange.filter : 'all']: page[arrange.filter ? arrange.filter : 'all'] <= 1 ? 1 : page[arrange.filter ? arrange.filter : 'all'] - 1
        }
      )
    })
}