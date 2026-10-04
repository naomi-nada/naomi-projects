/*
  Shared site behavior
  --------------------
  Project selection, the weekly update timer, and NEW markers all stay small and
  independent from the actual project/Wiki content.
*/

(() => {
  // Project cards switch the visible project panel without turning this into an app.
  const projectButtons = [...document.querySelectorAll("[data-project-select]")];
  const projectPanels = [...document.querySelectorAll("[data-project-panel]")];

  const syncProjectGroups = id => {
    const selectedGroup = document.querySelector('[data-project-group="selected"]');
    if (!selectedGroup) return;

    const groupMap = new Map(
      [...document.querySelectorAll('[data-project-group]')].map(group => [
        group.getAttribute('data-project-group'),
        group
      ])
    );

    const orderedButtons = [...projectButtons].sort((left, right) => {
      const leftOrder = Number(left.getAttribute('data-project-order') || '0');
      const rightOrder = Number(right.getAttribute('data-project-order') || '0');
      return leftOrder - rightOrder;
    });

    orderedButtons.forEach(button => {
      const projectId = button.getAttribute('data-project-select');
      const projectStatus = button.getAttribute('data-project-status') || 'active';
      const targetGroup = projectId === id ? groupMap.get('selected') : groupMap.get(projectStatus);
      if (targetGroup) {
        targetGroup.appendChild(button);
      }
    });
  };

  const selectProject = id => {
    projectButtons.forEach(button => {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-project-select") === id ? "true" : "false"
      );
    });

    projectPanels.forEach(panel => {
      panel.hidden = panel.getAttribute("data-project-panel") !== id;
    });

    syncProjectGroups(id);
  };

  projectButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectProject(button.getAttribute("data-project-select"));
    });
  });

  const initialButton =
    projectButtons.find(button => button.getAttribute('aria-pressed') === 'true') ||
    projectButtons[0];

  if (initialButton) {
    selectProject(initialButton.getAttribute('data-project-select'));
  }

  document.querySelectorAll('[data-project-nav]').forEach(select => {
    select.addEventListener('change', () => {
      const href = select.value;
      if (href) window.location.href = href;
    });
  });

  const state = window.NADA_WORKBENCH_STATE;
  if (!state || !state.site || !state.updates) return;

  const currentItems = Array.isArray(state.updates.items) ? state.updates.items : [];
  const currentKeys = new Set(currentItems.map(item => item && item.key).filter(Boolean));

  // Anything included in the current weekly update gets one quiet NEW marker.
  document.querySelectorAll("[data-update-key]").forEach(node => {
    const key = node.getAttribute("data-update-key");
    if (!currentKeys.has(key)) return;

    const target =
      node.querySelector("[data-new-badge-target]") ||
      node.querySelector(".card-top") ||
      node.querySelector(".list-name") ||
      node.querySelector("h1") ||
      node;

    if (target.querySelector && target.querySelector(".new-badge")) return;

    const badge = document.createElement("span");
    badge.className = "new-badge";
    badge.textContent = "NEW";
    badge.setAttribute("aria-label", "New this week");
    target.appendChild(badge);
  });

  // New-this-week links go straight to the thing that changed.
  const updateList = document.querySelector("[data-weekly-update-list]");
  const updateSection = document.querySelector("[data-weekly-update-section]");

  if (updateList && updateSection && currentItems.length > 0) {
    currentItems.forEach(item => {
      if (!item || !item.title || !item.href) return;

      const link = document.createElement("a");
      link.className = "weekly-update-link";
      link.href = item.href;

      const title = document.createElement("span");
      title.className = "weekly-update-title";
      title.textContent = item.title;

      const note = document.createElement("span");
      note.className = "weekly-update-note";
      note.textContent = item.text || "";

      link.append(title, note);
      updateList.appendChild(link);
    });

    updateSection.hidden = false;
  }

  const timer = document.querySelector("[data-next-update-timer]");
  const nextUpdate = new Date(state.site.nextUpdate);
  if (!timer || Number.isNaN(nextUpdate.getTime())) return;

  const pad = value => String(value).padStart(2, "0");

  const renderTimer = () => {
    const remaining = nextUpdate.getTime() - Date.now();

    if (remaining <= 0) {
      timer.textContent = "UPDATE DUE";
      timer.setAttribute("aria-label", "The next Workbench update is due");
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timer.textContent = `${days}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`;
    timer.setAttribute(
      "aria-label",
      `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until the next update`
    );
  };

  renderTimer();
  window.setInterval(renderTimer, 1000);
})();
