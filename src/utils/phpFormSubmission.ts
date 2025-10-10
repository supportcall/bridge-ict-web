import { toast } from "sonner";

interface FormData {
  [key: string]: any;
}

export const submitToPhp = async (
  formData: FormData,
  formTitle: string = "Contact Form"
): Promise<boolean> => {
  try {
    // Get the PHP endpoint URL - it should be hosted on your server
    const phpEndpoint = `${window.location.origin}/send-email.php`;
    
    // Prepare the data
    const submitData = {
      ...formData,
      subject: formTitle,
      form_type: formTitle,
      submitted_at: new Date().toISOString(),
    };

    const response = await fetch(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
      });
      return true;
    } else {
      throw new Error(result.error || "Failed to send message");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error("Failed to send message", {
      description: error instanceof Error ? error.message : "Please try again later",
    });
    return false;
  }
};
