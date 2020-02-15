export const toggleDirector = () => {
    const directorId = "hitchcock-director";
    const director = document.getElementById(directorId);
    if (director) {
      if (director.style.display === "block") {
        director.style.display = "none";
      } else {
        director.style.display = "block";
      }
    }
  
}