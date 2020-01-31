export const SETUP_CURRENT_TASK = 'SETUP_CURRENT_TASK';

export const setupCurrentTask = (task) => ({
    type: SETUP_CURRENT_TASK,
    task,
});
