document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.querySelector('#dog-bar');
    const dogInfo = document.querySelector('#dog-info');
    const filterButton = document.querySelector('#good-dog-filter');
    let filterGoodDogs = false;
  
    filterButton.addEventListener('click', () => {
      filterGoodDogs = !filterGoodDogs;
      filterButton.textContent = `Filter good dogs: ${filterGoodDogs ? 'ON' : 'OFF'}`;
      displayPups();
    });
  
    function displayPups() {
      dogBar.innerHTML = '';
      dogInfo.innerHTML = '';
  
      fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pupData => {
          pupData.forEach(pup => {
            if (!filterGoodDogs || pup.isGoodDog) {
              const span = document.createElement('span');
              span.textContent = pup.name;
  
              span.addEventListener('click', () => {
                dogInfo.innerHTML = '';
  
                const img = document.createElement('img');
                img.src = pup.image;
  
                const h2 = document.createElement('h2');
                h2.textContent = pup.name;
  
                const button = document.createElement('button');
                button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
                button.addEventListener('click', () => {
                  pup.isGoodDog = !pup.isGoodDog;
                  button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
  
                  fetch(`http://localhost:3000/pups/${pup.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      isGoodDog: pup.isGoodDog,
                    }),
                  })
                    .then(response => response.json())
                    .then(updatedPup => {
                      console.log('Updated pup:', updatedPup);
                    })
                    .catch(error => {
                      console.error('Error updating pup:', error);
                    });
                });
  
                dogInfo.appendChild(img);
                dogInfo.appendChild(h2);
                dogInfo.appendChild(button);
              });
  
              dogBar.appendChild(span);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching pup data:', error);
        });
    }
  
    displayPups();
  });
  