import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();
export const showConfetti = () => {
  jsConfetti.addConfetti({
    confettiRadius: 1,
    confettiNumber: 1000
  });
};
