projects.forEach((project, index) => {
  $("#projects").append(`

    <div id="${project.id}" class="tabcontent" style="display:${index === 0 ? "block" : "none"}">
      <h3 class="title-project">${project.title}</h3>
      <div class="project-container">
        <div class="info-project">
          <div>
            <p>
              ${project.description}
            </p>
            <div class="links-projects">

              <a href="${project.links.code.url}" target="_blank">
                Code
                <i class="${project.links.code.icon}"></i>
              </a>

              ${project.links.access.url
                ? `
                  <a href="${project.links.access.url}" target="_blank">
                    Acessar
                    <i class="${project.links.access.icon}"></i>
                  </a>
                `
                : ""
              }

            </div>
          </div>
          <img src="${project.image.src}" alt="${project.image.alt}">
        </div>

        <div class="mini-guide">
          <h3>Mini Guide</h3>
          <div class="guide-container">
            <div>
              <h5>Tech</h5>
             
              <ul>
                 ${project.miniGuide.tech.map(item => `<li>${item}</li>`).join(" ")}
              </ul>
            </div>

            ${project.miniGuide.typography.length > 0 
              ?`
                <div>
                  <h5>Typography</h5>
                  ${project.miniGuide.typography.map(typography => 
                    `
                      <h4>${typography.font}</h4>
                      <ul>
                      ${typography.weights.map(weight => `<li>${weight}</li>`).join(" ")}
                      </ul>
                    `
                  ).join("")}
                
                </div>
              `
              : ""
            }

           ${project.miniGuide.colors.length > 0
            ?`
              <div>
                <h5>Color Schema</h5>
                <ul class="colors">
                  ${project.miniGuide.colors
                    .map((color) => `
                        <li>
                          <span class="color-preview" style="background:${color};"></span>

                          <span>${color}</span>
                        </li>
                      `
                    )
                    .join("")}
                </ul>
              </div>
            `
            : ""
           } 
           
          </div>
        </div>
      </div>
    </div>

  `);
});