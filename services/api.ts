import api from '@/lib/axiosInstance';

export const sendOTP = (mobile: string) => {
  const form = new FormData();
  form.append('mobile', mobile);
  return api.post('/auth/send-otp', form);
};

export const verifyOTP = (mobile: any, otp: string) => {
  const form = new FormData();
  form.append('mobile', mobile);
  form.append('otp', otp);
  return api.post('/auth/verify-otp', form);
};

export const createProfile = (data: {
  mobile: any; name: string; email: string;
  qualification: string; profile_image: File;
}) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v as string));
  return api.post('/auth/create-profile', form);
};

export const listQuestions = () => api.get('/question/list');

export const submitAnswers = (answers: { question_id: number; selected_option_id: number | null }[]) => {
  const form = new FormData();
  form.append('answers', JSON.stringify(answers));
  return api.post('/answers/submit', form);
};