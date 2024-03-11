const output_male = await replicate.run(
    "lucataco/realvisxl-v2.0:7d6a2f9c4754477b12c14ed2a58f89bb85128edcdd581d24ce58b6926029de08",
    {
        input: {
            seed: 1111316861,
            width: 1024,
            height: 1024,
            prompt: "dark shot, front shot, closeup photo of a 25 y.o latino man, perfect eyes, natural skin, skin moles, looks at viewer, cinematic shot",
            scheduler: "DPMSolverMultistep",
            lora_scale: 0.6,
            num_outputs: 1,
            guidance_scale: 7,
            apply_watermark: true,
            negative_prompt: "(worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch), open mouth",
            prompt_strength: 0.8,
            num_inference_steps: 40
        }
    }
);

const output = await replicate.run(
    "lucataco/realistic-vision-v5:8aeee50b868f06a1893e3b95a8bb639a8342e846836f3e0211d6a13c158505b1",
    {
        input: {
            seed: 1335,
            steps: 20,
            width: 512,
            height: 728,
            prompt: "RAW photo, a portrait photo of a latina woman in casual clothes, natural skin, 8k uhd, high quality, film grain, Fujifilm XT3",
            guidance: 5,
            scheduler: "EulerA",
            negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck"
        }
    }
);