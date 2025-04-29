export async function fetchPostsByUser() {
    try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/get-posts-user/${user}`);    
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const posts = await response.json();

    if (!posts || Object.keys(posts).length === 0) {
        console.log("No se encontró el posts.");
        return null;
        
    }

    return posts;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function fetchUser() {
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/get-user/${userName}`);    
    
        const user = await response.json();
    
        if (!user || Object.keys(user).length === 0) {
            console.log("Error al buscar usuario");
            return null;
        }
    
        return user;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function registerUser() {
    console.log(body);
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/registerUser`, {
            headers: {
                "Content-Type": "application/json",
              },
            method: 'POST',
            body: body
        });    

        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}

export async function followUser() {
    console.log(body);
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/follow`, {
            headers: {
                "Content-Type": "application/json",
              },
            method: 'POST',
            body: body
        });    

        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}

export async function checkFollowRelation(user1Name, user2Name) {
    try {
      const response = await fetch('https://backend-wtp.vercel.app/api/checkFollowsRelation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1Name, user2Name }),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.followsRelationExists;
      
    } catch (error) {
      console.error("Error al verificar la relación:", error);
      return false;
    }
  };

export async function unfollowUser() {
    console.log(body);
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/unfollowUser`, {
            headers: {
                "Content-Type": "application/json",
              },
            method: 'POST',
            body: body
        });    

        return response;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}