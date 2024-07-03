import os
import subprocess
from pathlib import Path
import whisper
import sys

def convert_wav_to_mp3(input_file, output_file):
    """
    Convert WAV file to MP3 format.
    """
    ffmpeg_command = [
        'ffmpeg', '-i', input_file, '-codec:a', 'libmp3lame', '-qscale:a', '2', output_file
    ]
    subprocess.run(ffmpeg_command, check=True)
    print(f"Converted {input_file} to {output_file}")

def split_audio(input_file, output_dir, segment_length=30):
    """
    Split the audio file into segments.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    ffmpeg_command = [
        'ffmpeg', '-i', input_file, '-f', 'segment',
        '-segment_time', str(segment_length), '-c', 'copy',
        os.path.join(output_dir, 'output%03d.mp3')
    ]
    subprocess.run(ffmpeg_command, check=True)

def combine_transcriptions(transcriptions_dir):
    """
    Combine the content of all transcription text files from segment folders into a single string, preserving the order.
    """
    combined_text = []

    # Get the list of segment folders and sort them to ensure correct order
    segment_dirs = sorted(Path(transcriptions_dir).glob('output*'))

    for segment_dir in segment_dirs:
        # Check if it is a directory
        if segment_dir.is_dir():
            # Get the list of .txt files in the segment directory, sort them to ensure correct order
            text_files = sorted(segment_dir.glob('*.txt'))
            
            for text_file in text_files:
                with open(text_file, 'r') as file:
                    combined_text.append(file.read())
    
    return "\n".join(combined_text)

def transcribe_audio_clips(audio_dir, transcriptions_dir, model_name='small'):
    """
    Transcribe audio clips using Whisper.
    """
    if not os.path.exists(transcriptions_dir):
        os.makedirs(transcriptions_dir)

    for audio_file in Path(audio_dir).glob('*.mp3'):
        base_name = os.path.basename(audio_file)
        file_name, file_extension = os.path.splitext(base_name)
        curr_transcript_dir = os.path.join(transcriptions_dir, file_name)
        
        if not os.path.exists(curr_transcript_dir):
            os.makedirs(curr_transcript_dir)
        
        command = [
            'whisper', str(audio_file),
            '--model', model_name,
            '-o', curr_transcript_dir
        ]
        subprocess.run(command, check=True)
    
    # Combine transcriptions after processing
    combined_text = combine_transcriptions(transcriptions_dir)
    combined_text_file = os.path.join(transcriptions_dir, "combined_transcription.txt")
    
    with open(combined_text_file, 'w') as file:
        file.write(combined_text)
    
    print(f"Combined transcription saved to {combined_text_file}")

def main():
    # Check if the correct number of arguments are provided
    if len(sys.argv) < 2:
        print("Usage: python process_audio.py <audio_file_path>")
        sys.exit(1)

    # Retrieve the audio file path
    input_audio_file = sys.argv[1]

    # Ensure the input file exists
    if not os.path.isfile(input_audio_file):
        print(f"Error: The file {input_audio_file} does not exist.")
        sys.exit(1)

    base_name = os.path.basename(input_audio_file)
    file_name, file_extension = os.path.splitext(base_name)

    # Define new directories based on the file name
    new_dir_path = os.path.join("..", "tmp", f"{file_name}-segments")
    if not os.path.exists(new_dir_path):
        os.makedirs(new_dir_path)
        print(f"Directory created at: {new_dir_path}")
    else:
        print(f"Directory already exists at: {new_dir_path}")

    # Convert WAV to MP3 if necessary
    if file_extension.lower() == '.wav':
        mp3_file = os.path.join("..", "tmp", f"{file_name}.mp3")
        convert_wav_to_mp3(input_audio_file, mp3_file)
        input_audio_file = mp3_file
        print(f"Converted WAV to MP3: {mp3_file}")

    # Split and process the audio file
    split_audio(input_audio_file, new_dir_path)
    transcriptions_dir = f"{new_dir_path}-transcriptions"
    transcribe_audio_clips(new_dir_path, transcriptions_dir)

if __name__ == "__main__":
    main()
